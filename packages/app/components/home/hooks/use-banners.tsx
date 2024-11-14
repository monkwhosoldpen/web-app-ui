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
      username: "elonmusk",
      slug: "",
      link: "https://example.com",
      image: "https://picsum.photos/seed/picsum/5000/3333",
    },
    {
      type: "profile",
      username: "elonmusk",
      slug: "",
      link: "https://example.com",
      image: "https://picsum.photos/id/870/5000/3333",
    },
    {
      type: "profile",
      username: "elonmusk",
      slug: "",
      link: "https://example.com",
      image: "https://picsum.photos/id/522/5000/3333",
    },
    {
      type: "profile",
      username: "elonmusk",
      slug: "",
      link: "https://example.com",
      image: "https://picsum.photos/id/3/5000/3333",
    },
  ];

  return {
    data: mockData,
    isLoading: false,
    // Mock rest of the properties or methods if required
  };
};
