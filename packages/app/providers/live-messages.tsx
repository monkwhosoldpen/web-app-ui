import { useEffect, ReactNode, useCallback } from "react";
import toast from 'react-hot-toast';
import React, { createContext, useContext, useState } from "react";
import { supabase } from "./utils/supabaseClient";
import { Profile } from "app/types";

type LiveMessagesContextType = {
  messages: LiveChannelMessage[];
  inAppNotification?: {
    message: string;
    sender: string;
  } | null;
};

const LiveMessagesContext = createContext<LiveMessagesContextType>({
  messages: [],
  inAppNotification: null,
});

export const useLiveMessagesContext = () => {
  const context = useContext(LiveMessagesContext);
  if (!context) {
    throw new Error('useLiveMessagesContext must be used within a LiveMessagesProvider');
  }
  return context;
};

export type ChannelMessageItem = {
  channel_message: {
    id: number;
    created_at: string;
    updated_at: string;
    is_payment_gated: boolean;
    body: string;
    body_text_length: number;
    sent_by: {
      id: number;
      admin: boolean;
      created_at: string;
      updated_at: string;
      profile: {
        verified: boolean;
        bio: string;
        profile_id: number;
        name: string;
        username: string;
        wallet_addresses: string[];
        img_url: string[];
      };
    };
  };
  reaction_group: Array<{
    reaction_id: number;
    count: number;
    self_reacted: boolean;
  }>;
  read: boolean;
};

type LiveChannelMessage = ChannelMessageItem;

// Helper function to show notifications across platforms
const showNotification = (title: string, body: string) => {
  toast(body, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#333',
      color: '#fff',
    },
  });
};

function formatMessage(message: any, userProfile: any): ChannelMessageItem {
  return {
    channel_message: {
      id: message.id,
      created_at: message.created_at,
      updated_at: message.created_at,
      is_payment_gated: false,
      body: message.content,
      body_text_length: message.content?.length || 0,
      sent_by: {
        id: userProfile.id,
        admin: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        profile: {
          verified: userProfile.verified || false,
          bio: userProfile.bio,
          profile_id: userProfile.id,
          name: userProfile.name,
          username: userProfile.username,
          wallet_addresses: userProfile.wallet_addresses,
          img_url: userProfile.img_url
        }
      }
    },
    reaction_group: [
      {
        reaction_id: 1,
        count: 0,
        self_reacted: false
      }
    ],
    read: false
  };
}

export const LiveMessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<LiveChannelMessage[]>([]);
  const [inAppNotification, setInAppNotification] = useState<{
    message: string;
    sender: string;
  } | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      console.log('Fetching initial messages...');
      const { data, error } = await supabase
        .from("live_messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        console.log('Initial messages fetched:', data);
        const formattedMessages = data.map(msg => formatMessage(msg, DEFAULT_USER_PROFILE));
        setMessages(formattedMessages);
      }
    };

    fetchMessages();

    const subscription = supabase
      .channel("public:live_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "live_messages",
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          setMessages((prev: LiveChannelMessage[]) => {
            showNotification(
              'New Message',
              payload.new.content
            );

            const formattedMessage = formatMessage(payload.new, DEFAULT_USER_PROFILE);
            return [...prev, formattedMessage];
          });
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up subscription...');
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <LiveMessagesContext.Provider value={{ messages, inAppNotification }}>
      {children}
    </LiveMessagesContext.Provider>
  );
};

// Add a type for message counts
type MessageCounts = {
  [key: string]: number;
};

const DEFAULT_USER_PROFILE = {
  id: 9999,
  name: "System",
  img_url: [],
  verified: false,
  bio: "",
  username: "system",
  wallet_addresses: []
};

export const useLiveMessages = (username?: string | number) => {
  const [messages, setMessages] = useState<LiveChannelMessage[]>([]);
  const [newMessages, setNewMessages] = useState<LiveChannelMessage[]>([]);
  const [messageCounts, setMessageCounts] = useState<MessageCounts>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const updateMessageCounts = useCallback((msgs: LiveChannelMessage[]) => {
    const counts: MessageCounts = {};
    msgs.forEach(() => {
      const subgroupId = 'live';
      counts[subgroupId] = (counts[subgroupId] || 0) + 1;
    });
    setMessageCounts(counts);
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('live_messages')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        const formattedMessages = data.map(msg => formatMessage(msg, DEFAULT_USER_PROFILE));
        setMessages(formattedMessages);
        updateMessageCounts(formattedMessages);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [username, updateMessageCounts]);

  useEffect(() => {
    const channel = supabase
      .channel('live_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'live_messages'
        },
        (payload) => {
          const formattedMessage = formatMessage(payload.new, DEFAULT_USER_PROFILE);

          showNotification(
            'New Message',
            payload.new.content
          );

          setMessages(prev => {
            const newMessages = [...prev, formattedMessage];
            updateMessageCounts(newMessages);
            return newMessages;
          });
          setNewMessages(prev => [...prev, formattedMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.channel('live_messages').unsubscribe();
    };
  }, [username, updateMessageCounts]);

  return {
    data: messages,
    newMessages,
    messageCounts,
    isLoading: loading,
    isLoadingMore: false,
    error,
    markAllAsRead: useCallback(() => {
      setNewMessages([]);
    }, []),
  };
}; 