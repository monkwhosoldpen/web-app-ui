import { useEffect, useMemo, ReactNode, useRef, useCallback } from "react";
import { Platform } from "react-native";

import { useRouter } from "@showtime-xyz/universal.router";

import { UserContext } from "app/context/user-context";
import { useMyInfo } from "app/hooks/api-hooks";
import { useAuth } from "app/hooks/auth/use-auth";
import { registerForPushNotificationsAsync } from "app/lib/register-push-notification";
import { isProfileIncomplete } from "app/utilities";

export const MY_INFO_ENDPOINT = "/v2/myinfo";

// context/LiveMessagesProvider.js
import React, { createContext, useContext, useState } from "react";
import { supabase } from "./utils/supabaseClient";
import { Profile } from "app/types";

const LiveMessagesContext = createContext<any>(null);

export type ChannelMessage = {
  body: string;
  created_at: string;
  updated_at: string;
  id: number;
  is_payment_gated?: boolean;
  sent_by: {
    admin: boolean;
    created_at: string;
    id: number;
    profile: Profile;
  };
};

export type ReactionGroup = {
  count: number;
  reaction_id: number;
  self_reacted: boolean;
};


type LiveChannelMessage = any;

export const LiveMessagesProvider = ({ children }: { children: ReactNode }) => {

  const { data, error, mutate } = useMyInfo();
  const [messages, setMessages] = useState<any>([]);

  // Fetch initial messages and subscribe to updates
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
        setMessages(data);
      }
    };

    fetchMessages();

    // Subscribe to live updates
    console.log('Setting up real-time subscription...');
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
          setMessages((prev) => {
            console.log('Previous messages:', prev);
            console.log('Adding new message:', payload.new);
            return [...prev, payload.new];
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
    <LiveMessagesContext.Provider value={{ messages }}>
      {children}
    </LiveMessagesContext.Provider>
  );
};

// Add a type for message counts
type MessageCounts = {
  [key: string]: number;
};

export const useLiveMessages = (username?: string | number, subgroup_username: any = '') => {
  const [messages, setMessages] = useState<LiveChannelMessage[]>([]);
  const [newMessages, setNewMessages] = useState<LiveChannelMessage[]>([]);
  const [messageCounts, setMessageCounts] = useState<MessageCounts>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Calculate message counts
  const updateMessageCounts = useCallback((msgs: LiveChannelMessage[]) => {
    const counts: MessageCounts = {};

    msgs.forEach((msg: any) => {
      const subgroupId = 'live';
      counts[subgroupId] = (counts[subgroupId] || 0) + 1;
    });
    setMessageCounts(counts);
  }, []);

  // Fetch initial messages for the username
  useEffect(() => {
    const fetchMessages = async () => {
      console.log('useLiveMessages: Fetching messages for username:', username);
      const { data, error } = await supabase
        .from('live_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        console.log('useLiveMessages: Messages fetched:', data);
        const userProfile = {
          "id": 9999,
          "name": "Louis Imperiale / Fifth Lucky Dragon",
          "img_url": ["https://lh3.googleusercontent.com/y3o-WnQJ-X-P3N612pr8BFW2iyXCWxj514ZjbjB1jUSMXh3BOR6OI4tjLUCzGSipHTbZrZ62MnR-u1EWpAB0NVT6TRBO_c5gDP8"],
          "cover_url": ["https://lh3.googleusercontent.com/oGekvBJSRleJJsUI2_Tyho1W0SYVdATSSNda2YFWBwyydk9gP1oNEwt3b0ddT7KhRY7RSacYUxCstPZV22sU0PXXy6i2aBcfdw4g"],
          "wallet_addresses": [
            "0xeA95bb6dEDe570Fd6043b17A8f4dB18064294af9",
            "0x42FE3f16A3A2ca4B02b9E392Dbe6AE6c4C55C635",
            "0xE347D56d5cCF423224E980Faf55232Ef4350a6bF"
          ],
          captcha_completed_at: "TODAY",
          "wallet_addresses_v2": [
            {
              "address": "0xeA95bb6dEDe570Fd6043b17A8f4dB18064294af9",
              "ens_domain": "frankiestyles.eth",
              "nickname": null,
              "is_email": 0
            },
            {
              "address": "0x42FE3f16A3A2ca4B02b9E392Dbe6AE6c4C55C635",
              "ens_domain": null,
              "nickname": null,
              "is_email": 0
            },
            {
              "address": "0xE347D56d5cCF423224E980Faf55232Ef4350a6bF",
              "ens_domain": null,
              "nickname": null,
              "is_email": 0
            }
          ],
          "wallet_addresses_excluding_email": [
            "0xeA95bb6dEDe570Fd6043b17A8f4dB18064294af9",
            "0xE347D56d5cCF423224E980Faf55232Ef4350a6bF",
            "0x42FE3f16A3A2ca4B02b9E392Dbe6AE6c4C55C635"
          ],
          "wallet_addresses_excluding_email_v2": [
            {
              "address": "0xeA95bb6dEDe570Fd6043b17A8f4dB18064294af9",
              "ens_domain": "frankiestyles.eth",
              "nickname": null
            },
            {
              "address": "0xE347D56d5cCF423224E980Faf55232Ef4350a6bF",
              "ens_domain": null,
              "nickname": null
            },
            {
              "address": "0x42FE3f16A3A2ca4B02b9E392Dbe6AE6c4C55C635",
              "ens_domain": null,
              "nickname": null
            }
          ],
          "bio": "My passion for illustration and coffee is a great combination, and it's always good to have a unique style that sets you apart from others in your field. Don\u2019t give me camera I will run off with it and take unique pictures.\n\nAlso I talk to myself.",
          "website_url": "https://lynkfire.com/vaunsart",
          "username": "vaunarts",
          "verified": true,
          "featured_nft_img_url": null,
          "links": [],
          "spotify_artist_id": "1L0eYtrSxuk6bhdupdVFpH",
          "apple_music_artist_id": "1489534572",
          "social_login_handles": {
            "instagram": "frankiestyless",
            "twitter": "FrankieStyless"
          },
          "channels": [
            {
              "id": 101,
              "name": "Frankistyless_channel",
              "self_is_member": false,
              "message_count": 24,
              "permissions": {
                "can_upload_media": false,
                "can_send_messages": false,
                "can_view_creator_messages": false,
                "can_view_public_messages": false
              }
            }
          ],
          "latest_star_drop_collected": {
            "slug": "frankie-styles-need-a-minute",
            "contract_address": "0xc4B9714b3f5EceAa416217eF40d2f9E6Aec1f132",
            "username": "Frankistyless"
          },
          "creator_token_onboarding_status": "onboarded",
          "songs_minted_count": 33,
          "creator_token": {
            "address": "0x6d1943172723F35b482D74AD4ec7d781a4B8fc7F",
            "id": 9,
            "crossmint_id": null
          }
        };
        let formattedMessages: any = data.map(message => {
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
                created_at: userProfile.created_at,
                updated_at: userProfile.updated_at,
                profile: {
                  verified: userProfile.verified || false,
                  bio: userProfile.bio,
                  profile_id: userProfile.id,
                  name: userProfile.name,
                  username: userProfile.username,
                  wallet_address: userProfile.wallet_address,
                  wallet_address_nonens: userProfile.wallet_address_nonens,
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
        });
        setMessages(formattedMessages as any[]);
        updateMessageCounts(formattedMessages as any[]);
      }
    };

    fetchMessages();
  }, [username, updateMessageCounts]);

  // Modified real-time subscription to handle new messages
  useEffect(() => {
    console.log('Setting up real-time subscription for username:', username);
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
          console.log('Real-time message received:', payload.new);
          console.log('Current username:', username);
          const newMessage = payload.new as any;
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages, newMessage];
            updateMessageCounts(newMessages);
            return newMessages;
          });
          setNewMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up subscription for username:', username);
      supabase.channel('live_messages').unsubscribe();
    };
  }, [username, updateMessageCounts]);

  return {
    data: messages as any[],
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