import { useKV } from "app/hooks/use-kv";

export type Banner = {
  type: "profile" | "drop" | "link";
  username: string;
  slug: string;
  link: string;
  image: string;
};

// export const useBanners = () => {
//   const { data, ...rest } = useKV<Banner[]>("banners");
//   return {
//     data: data ?? [],
//     ...rest,
//   };
// };

export const useBanners = () => {
  const mockData: Banner[] = [
    {
      type: "profile",
      username: "JohnDoe",
      slug: "",
      link: "https://example.com",
      image: "https://cydjretpcgmuezpkbkql.supabase.co/storage/v1/object/public/media/banners/banner1.webp?t=2024-02-19T03%3A09%3A02.508Z",
    },
    {
      type: "profile",
      username: "JohnDoe",
      slug: "",
      link: "https://example.com",
      image: "https://cydjretpcgmuezpkbkql.supabase.co/storage/v1/object/public/media/banners/banner2.webp",
    },
    {
      type: "profile",
      username: "JohnDoe",
      slug: "",
      link: "https://example.com",
      image: "https://cydjretpcgmuezpkbkql.supabase.co/storage/v1/object/public/media/banners/banner4.webp",
    },
    {
      type: "profile",
      username: "JohnDoe",
      slug: "",
      link: "https://example.com",
      image: "https://cydjretpcgmuezpkbkql.supabase.co/storage/v1/object/public/media/banners/banner6.webp",
    },
    // Add more pleasant events with corresponding Wikipedia or reliable sources links
  ];

  return {
    data: mockData,
    isLoading: false
    // Mock rest of the properties or methods if required
  };
};
