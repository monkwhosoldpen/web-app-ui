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
      image: "https://via.placeholder.com/300/FF0000/FFFFFF?text=Banner1",
    },
    {
      type: "profile",
      username: "JohnDoe",
      slug: "",
      link: "https://example.com",
      image: "https://via.placeholder.com/300/00FF00/FFFFFF?text=Banner2",
    },
    {
      type: "profile",
      username: "JohnDoe",
      slug: "",
      link: "https://example.com",
      image: "https://via.placeholder.com/300/0000FF/FFFFFF?text=Banner3",
    },
    {
      type: "profile",
      username: "JohnDoe",
      slug: "",
      link: "https://example.com",
      image: "https://via.placeholder.com/300/FFFF00/FFFFFF?text=Banner4",
    },
    // Add more pleasant events with corresponding Wikipedia or reliable sources links
  ];

  return {
    data: mockData,
    isLoading: false
    // Mock rest of the properties or methods if required
  };
};
