import { Instagram, Twitter, Mail, Github } from "@showtime-xyz/universal.icon";

const links = [
  // {
  //   link: "",
  //   title: "Careers",
  // },

  {
    link: "https://www.notion.so/Terms-of-Service-5be0ab74931b4729a31923743e400296?pvs=12",
    title: "Terms & Conditions",
  },
  {
    link: "mailto:help@goatsconnect.xyz",
    title: "Feedback",
  },
  // {
  //   link: "/assets/Showtime-Assets.zip",
  //   title: "Brand Assets",
  // },
  {
    link: "https://www.notion.so/FAQ-b9dd69e66efa4766aab26f4a9adeea99",
    title: "FAQ",
  },
];

const social = [
  {
    icon: Twitter,
    link: "https://twitter.com/goatsconnect_com",
    title: "Twitter",
  },
  {
    icon: Instagram,
    link: "https://www.instagram.com/goatsconnect_com",
    title: "Instagram",
  },

  {
    icon: Mail,
    link: "mailto:help@goatsconnect.xyz",
    title: "Contact",
  },
  {
    icon: Github,
    link: "https://github.com/showtime-xyz/showtime-frontend  ",
    title: "Github",
  },
];

export const useFooter = () => {
  return { links, social };
};
