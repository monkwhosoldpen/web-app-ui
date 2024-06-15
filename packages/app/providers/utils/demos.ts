
export type BioData = {
  name: string;
  occupation: string;
  interests: any;
  headline: any;
  socialLinks: any[];
  imageUrl: string;
  bio: any;
};

export const ColorPalette = [
  '#FF5733', // vivid orange
  '#FFC300', // bright yellow
  '#DAF7A6', // light green
  '#7FFFD4', // aqua
  '#00FFFF', // cyan
  '#FF69B4', // hot pink
  '#FFE4E1', // light pink
  '#00FF7F', // spring green
  '#BA55D3', // medium purple
  '#FFFF00', // yellow
  '#8B0000', // dark red
  '#1E90FF'  // dodger blue
];

export const mockBioData: BioData = {
  name: 'Cristiano Ronaldo',
  headline: 'Professional Footballer',
  occupation: 'Footballer',
  imageUrl: "https://source.unsplash.com/random/150x150/?CristianoRonaldo",
  interests: [
    {
      "id": 5,
      "image": "https://via.placeholder.com/300x200",
      "title": "Entrepreneurship"
    },
    {
      "id": 6,
      "image": "https://via.placeholder.com/300x200",
      "title": "Travel"
    },
    {
      "id": 13,
      "image": "https://via.placeholder.com/300x200",
      "title": "Sports"
    },
    {
      "id": 14,
      "image": "https://via.placeholder.com/300x200",
      "title": "Fashion"
    }
  ],
  bio: 'GOAT -> 🐐 ',
  socialLinks: [
    {
      name: 'Twitter',
      url: 'https://twitter.com/Cristiano',
      icon: 'https://source.unsplash.com/random/150x150/?twitter',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/cristiano/',
      icon: 'https://source.unsplash.com/random/150x150/?instagram',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/Cristiano/',
      icon: 'https://source.unsplash.com/random/150x150/?facebook',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/cristiano-ronaldo-0360a6142/',
      icon: 'https://source.unsplash.com/random/150x150/?linkedin',
    },
  ],
};

type Interest = {
  id: number;
  title: string;
  image: string;
};

export const TABS = [
  {
    id: 0,
    name: '',
  },
  {
    id: 1,
    name: 'Twitter',
  },
  {
    id: 2,
    name: 'Facebook',
  },
  {
    id: 3,
    name: 'Instagram',
  },
  {
    id: 4,
    name: 'Koo',
  },
  // {
  //   id: 5,
  //   name: 'LinkedIn',
  // },
  // {
  //   id: 6,
  //   name: 'ShareChat',
  // },
  // {
  //   id: 7,
  //   name: 'News',
  // },
];


export const interests: Interest[] = [
  { id: 1, title: "Photography", image: "https://via.placeholder.com/300x200" },
  { id: 2, title: "Technology", image: "https://via.placeholder.com/300x200" },
  { id: 3, title: "Design", image: "https://via.placeholder.com/300x200" },
  { id: 4, title: "Music", image: "https://via.placeholder.com/300x200" },
  { id: 5, title: "Entrepreneurship", image: "https://via.placeholder.com/300x200" },
  { id: 6, title: "Travel", image: "https://via.placeholder.com/300x200" },
  { id: 7, title: "Arts", image: "https://via.placeholder.com/300x200" },
  { id: 8, title: "Reading", image: "https://via.placeholder.com/300x200" },
  { id: 9, title: "Food", image: "https://via.placeholder.com/300x200" },
  { id: 10, title: "Movies", image: "https://via.placeholder.com/300x200" },
  { id: 11, title: "Fitness", image: "https://via.placeholder.com/300x200" },
  { id: 12, title: "Gaming", image: "https://via.placeholder.com/300x200" },
  { id: 13, title: "Sports", image: "https://via.placeholder.com/300x200" },
  { id: 14, title: "Fashion", image: "https://via.placeholder.com/300x200" },
  { id: 15, title: "Cooking", image: "https://via.placeholder.com/300x200" },
  { id: 16, title: "Nature", image: "https://via.placeholder.com/300x200" },
  { id: 17, title: "Coding", image: "https://via.placeholder.com/300x200" },
  { id: 18, title: "Dancing", image: "https://via.placeholder.com/300x200" },
  { id: 19, title: "Pets", image: "https://via.placeholder.com/300x200" },
];

export const availableSocialLinks = [
  {
    name: "Twitter",
    image: "https://via.placeholder.com/150x150?text=Twitter",
    url: "https://twitter.com/username",
    handle: ''
  },
  {
    name: "LinkedIn",
    image: "https://via.placeholder.com/150x150?text=LinkedIn",
    url: "https://www.linkedin.com/username",
    handle: ''
  },
  {
    name: "Instagram",
    image: "https://via.placeholder.com/150x150?text=Instagram",
    url: "https://www.instagram.com/username",
    handle: ''
  },
  {
    name: "Facebook",
    image: "https://via.placeholder.com/150x150?text=Facebook",
    url: "https://www.facebook.com/username",
    handle: ''
  },
  {
    name: "YouTube",
    image: "https://via.placeholder.com/150x150?text=YouTube",
    url: "https://www.youtube.com/username",
    handle: ''
  },
  {
    name: "Reddit",
    image: "https://via.placeholder.com/150x150?text=Reddit",
    url: "https://www.reddit.com/user/username",
    handle: ''
  },
  {
    name: "Pinterest",
    image: "https://via.placeholder.com/150x150?text=Pinterest",
    url: "https://www.pinterest.com/username",
    handle: ''
  },
  {
    name: "Medium",
    image: "https://via.placeholder.com/150x150?text=Medium",
    url: "https://medium.com/@username",
    handle: ''
  },
  {
    name: "Spotify",
    image: "https://via.placeholder.com/150x150?text=Spotify",
    url: "https://spotify.com/username",
    handle: ''
  },
];

export const locationsData: any = [
  {
    label: 'Group 1',
    options: [
      { value: "Andhra Pradesh", label: "Andhra Pradesh", icon: "https://source.unsplash.com/featured/?andhra-pradesh" },
      { value: "Arunachal Pradesh", label: "Arunachal Pradesh", icon: "https://source.unsplash.com/featured/?arunachal-pradesh" },
      { value: "Assam", label: "Assam", icon: "https://source.unsplash.com/featured/?assam" },
      { value: "Bihar", label: "Bihar", icon: "https://source.unsplash.com/featured/?bihar" },
      { value: "Chhattisgarh", label: "Chhattisgarh", icon: "https://source.unsplash.com/featured/?chhattisgarh" },
      { value: "Goa", label: "Goa", icon: "https://source.unsplash.com/featured/?goa" },
      { value: "Gujarat", label: "Gujarat", icon: "https://source.unsplash.com/featured/?gujarat" },
      { value: "Haryana", label: "Haryana", icon: "https://source.unsplash.com/featured/?haryana" },
      { value: "Himachal Pradesh", label: "Himachal Pradesh", icon: "https://source.unsplash.com/featured/?himachal-pradesh" },
      { value: "Jharkhand", label: "Jharkhand", icon: "https://source.unsplash.com/featured/?jharkhand" },
      { value: "Karnataka", label: "Karnataka", icon: "https://source.unsplash.com/featured/?karnataka" },
      { value: "Kerala", label: "Kerala", icon: "https://source.unsplash.com/featured/?kerala" },
      { value: "Madhya Pradesh", label: "Madhya Pradesh", icon: "https://source.unsplash.com/featured/?madhya-pradesh" },
      { value: "Maharashtra", label: "Maharashtra", icon: "https://source.unsplash.com/featured/?maharashtra" },
      { value: "Manipur", label: "Manipur", icon: "https://source.unsplash.com/featured/?manipur" },
      { value: "Meghalaya", label: "Meghalaya", icon: "https://source.unsplash.com/featured/?meghalaya" },
      { value: "Mizoram", label: "Mizoram", icon: "https://source.unsplash.com/featured/?mizoram" },
      { value: "Nagaland", label: "Nagaland", icon: "https://source.unsplash.com/featured/?nagaland" },
      { value: "Odisha", label: "Odisha", icon: "https://source.unsplash.com/featured/?odisha" },
      { value: "Punjab", label: "Punjab", icon: "https://source.unsplash.com/featured/?punjab" },
      { value: "Rajasthan", label: "Rajasthan", icon: "https://source.unsplash.com/featured/?rajasthan" },
      { value: "Sikkim", label: "Sikkim", icon: "https://source.unsplash.com/featured/?sikkim" }
    ]
  }
];

export const mockTableRows: any = [
  {
    id: 1,
    name: "John",
    communityType: "Type A",
    other: "Other 1",
    percentage: "50%",
    hobbies: ["Reading", "Gaming"],
    foodPreferences: "Vegetarian",
    avgPerCapitaIncome: 50000,
    averageAge: 30
  },
  {
    id: 2,
    name: "Jane",
    communityType: "Type B",
    other: "Other 2",
    percentage: "30%",
    hobbies: ["Music", "Sports"],
    foodPreferences: "Vegan",
    avgPerCapitaIncome: 60000,
    averageAge: 35
  },
  // Add more rows as needed
];

export const RSSNewsFeedUrls: any = [
  {
    "name": "Indian Express",
    "slug": "IndianExpress",
    "link": "https://indianexpress.com/section/india/feed/"
  },
  {
    "name": "Times of India",
    "slug": "TimesofIndia",
    "link": "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms"
  },
  {
    "name": "Hindustan Times",
    "slug": "HindustanTimes",
    "link": "https://www.hindustantimes.com/rss/india/rssfeed.xml"
  },
  {
    "name": "The Hindu",
    "slug": "TheHindu",
    "link": "https://www.thehindu.com/news/national/feeder/default.rss"
  },
  {
    "name": "India Today",
    "slug": "IndiaToday",
    "link": "https://www.indiatoday.in/rss/home"
  },
  {
    "name": "NDTV News",
    "slug": "NDTVNews",
    "link": "https://feeds.feedburner.com/ndtvnews-india-news"
  },
  {
    "name": "CNN-News18",
    "slug": "CNN-News18",
    "link": "https://www.news18.com/rss/india.xml"
  },
  {
    "name": "Firstpost - India",
    "slug": "Firstpost-India",
    "link": "https://www.firstpost.com/rss/india.xml"
  },
  {
    "name": "Zee News - India",
    "slug": "ZeeNews-India",
    "link": "https://zeenews.india.com/rss/india-national-news.xml"
  },
  {
    "name": "India.com",
    "slug": "India.com",
    "link": "https://zeenews.india.com/rss/india-national-news.xml"
  },
  {
    "name": "Oneindia - India",
    "slug": "Oneindia-India",
    "link": "https://www.oneindia.com/rss/news-india-fb.xml"
  },
  {
    "name": "Deccan Herald - India",
    "slug": "DeccanHerald-India",
    "link": "https://www.deccanherald.com/rss/india.rss"
  },
  {
    "name": "The Economic Times - India",
    "slug": "TheEconomicTimes-India",
    "link": "https://economictimes.indiatimes.com/rssfeeds/1052733553.cms"
  },
  {
    "name": "Business Standard - India",
    "slug": "BusinessStandard-India",
    "link": "https://www.business-standard.com/rss/latest.rss"
  },
  {
    "name": "The Times of India - India",
    "slug": "TheTimesofIndia-India",
    "link": "https://timesofindia.indiatimes.com/rssfeeds/4719148.cms"
  },
  {
    "name": "Live Mint - India",
    "slug": "LiveMintIndia",
    "link": "https://www.livemint.com/rss/news"
  },
  {
    "name": "Moneycontrol - India",
    "slug": "Moneycontrol-India",
    "link": "https://www.moneycontrol.com/rss"
  }
];

export const MenuItems: any = [
  {
    "name": "Home",
    "slug": "Home",
    "link": "./home?hl=en-IN&gl=IN&ceid=IN%3Aen"
  },
  {
    "name": "For you",
    "slug": "Foryou",
    "link": "./foryou?hl=en-IN&gl=IN&ceid=IN%3Aen"
  },
  {
    "name": "Following",
    "slug": "Following",
    "link": "./my/library?hl=en-IN&gl=IN&ceid=IN%3Aen"
  },
  {
    "name": "News Showcase",
    "slug": "NewsShowcase",
    "link": "./showcase?hl=en-IN&gl=IN&ceid=IN%3Aen"
  },
  {
    "name": "India",
    "slug": "India",
    "link": "./topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNRE55YXpBU0JXVnVMVWRDS0FBUAE?hl=en-IN&gl=IN&ceid=IN%3Aen"
  },
  {
    "name": "World",
    "slug": "World",
    "link": "./topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen"
  },
  {
    "name": "Local",
    "slug": "Local",
    "link": "./topics/CAAqHAgKIhZDQklTQ2pvSWJHOWpZV3hmZGpJb0FBUAE?hl=en-IN&gl=IN&ceid=IN%3Aen"
  },
  {
    "name": "Business",
    "slug": "Business",
    "link": "./topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen"
  },
  {
    "name": "Technology",
    "slug": "Technology",
    "link": "./topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen"
  }
];

export const languagesMock = [
  { label: "English", icon: "🇺🇸", checked: true },
  { label: "Japanese", icon: "🇯🇵", checked: false },
  { label: "Korean", icon: "🇰🇷", checked: false },
  { label: "French", icon: "🇫🇷", checked: false },
  { label: "German", icon: "🇩🇪", checked: false },
  { label: "Spanish", icon: "🇪🇸", checked: false },
  { label: "Italian", icon: "🇮🇹", checked: false },
  { label: "Portuguese", icon: "🇵🇹", checked: false },
  { label: "Dutch", icon: "🇳🇱", checked: false },
  { label: "Czech", icon: "🇨🇿", checked: false },
  { label: "Danish", icon: "🇩🇰", checked: false },
  { label: "Finnish", icon: "🇫🇮", checked: false },
  { label: "Hungarian", icon: "🇭🇺", checked: false },
  { label: "Norwegian", icon: "🇳🇴", checked: false },
  { label: "Polish", icon: "🇵🇱", checked: false },
  { label: "Greek", icon: "🇬🇷", checked: false },
  { label: "Russian", icon: "🇷🇺", checked: false },
  { label: "Arabic", icon: "🇸🇦", checked: false },
  { label: "Hindi", icon: "🇮🇳", checked: false },
  { label: "Indonesian", icon: "🇮🇩", checked: false },
  { label: "Malay", icon: "🇲🇾", checked: false },
  { label: "Thai", icon: "🇹🇭", checked: false },
  { label: "Vietnamese", icon: "🇻🇳", checked: false },
  { label: "Bengali", icon: "🇧🇩", checked: true },
  { label: "Punjabi", icon: "🇵🇰", checked: true },
  { label: "Tamil", icon: "🇮🇳", checked: true },
  { label: "Telugu", icon: "🇮🇳", checked: true },
  { label: "Urdu", icon: "🇵🇰", checked: false },
  { label: "Persian", icon: "🇮🇷", checked: false },
  { label: "Turkish", icon: "🇹🇷", checked: false },
  { label: "Burmese", icon: "🇲🇲", checked: false },
  { label: "Romanian", icon: "🇷🇴", checked: false },
];

export interface Stars {
  id: number;
  name: string;
  wikipediaUrl: string;
}

export const stars: Stars[] = [
  { id: 1, name: 'Virat Kohli', wikipediaUrl: 'https://en.wikipedia.org/wiki/Virat_Kohli' },
  { id: 2, name: 'Rohit Sharma', wikipediaUrl: 'https://en.wikipedia.org/wiki/Rohit_Sharma' },
  { id: 3, name: 'Kane Williamson', wikipediaUrl: 'https://en.wikipedia.org/wiki/Kane_Williamson' },
  { id: 4, name: 'Joe Root', wikipediaUrl: 'https://en.wikipedia.org/wiki/Joe_Root' },
  { id: 5, name: 'Steve Smith', wikipediaUrl: 'https://en.wikipedia.org/wiki/Steve_Smith_(cricketer)' },
  { id: 6, name: 'Babar Azam', wikipediaUrl: 'https://en.wikipedia.org/wiki/Babar_Azam' },
  { id: 7, name: 'David Warner', wikipediaUrl: 'https://en.wikipedia.org/wiki/David_Warner_(cricketer)' },
  { id: 8, name: 'Ross Taylor', wikipediaUrl: 'https://en.wikipedia.org/wiki/Ross_Taylor_(cricketer)' },
  { id: 9, name: 'Kagiso Rabada', wikipediaUrl: 'https://en.wikipedia.org/wiki/Kagiso_Rabada' },
  { id: 10, name: 'Jasprit Bumrah', wikipediaUrl: 'https://en.wikipedia.org/wiki/Jasprit_Bumrah' },
];


export const mockEditLinks = [
  {
    name: 'Bio',
    description: 'Help others learn know about you',
    href: '/profile/edit/bio',
  },
  // {
  // name: 'Spotlight Button',
  //     description: 'Give your visitors a clear call to action.',
  //     href: '/profile/edit/spotlight',
  // },
  // {
  // name: 'Add-ons',
  //     description: 'Show your work and connect with visitors.',
  //     href: '/profile/edit/addon',
  // },
  {
    name: 'Appearance',
    description: 'Change your layout or photo',
    href: '/profile/edit/appearance',
  },
  {
    name: 'Details',
    description: 'Update work, interests & social links',
    href: '/profile/edit/details',
  },
  {
    name: 'Account',
    description: 'Update account and other settings',
    href: '/profile/edit/account',
  },
];

export const mockSpotLightLinks = [
  {
    name: "Visit",
    href: '/profile/edit/spotlight/visit',
    description: "Get more visits to another website",
  },
  {
    name: "Payment",
    href: '/profile/edit/spotlight/payment',
    description: "Accept payments",
  },
  {
    name: "Download",
    href: '/profile/edit/spotlight/download',
    description: "Let people download a file",
  },
  {
    name: "Contact",
    href: '/profile/edit/spotlight/contact',
    description: "Let people email me",
  },
  {
    name: "Call",
    href: '/profile/edit/spotlight/call',
    description: "Let people call me",
  },
  {
    name: "Capture",
    href: '/profile/edit/spotlight/capture',
    description: "Capture leads",
  },
  {
    name: "Schedule",
    href: '/profile/edit/spotlight/schedule',
    description: "Let people book time with me",
  },
];

export const mockAddonLinks = [
  {
    name: "Portfolio",
    description: "Add a gallery of images and videos",
    href: "/profile/edit/addon/portfolio",
  },
  {
    name: "Video",
    description: "Embed a video on your page.",
    href: "/profile/edit/addon/video",
  },
  {
    name: "Testimonials",
    description: "Add endorsements to your page",
    href: "/profile/edit/addon/testimonials",
  },
  {
    name: "Contact Me",
    description: "Let visitors send you a message",
    href: "/profile/edit/addon/contact",
  }
];

export const mockDetailsLinks = [
  {
    name: "Location",
    description: "Location",
    href: "/profile/edit/details/location",
  },
  {
    name: "Interests",
    description: "Interests",
    href: "/profile/edit/details/interests",
  },
  {
    name: "Occupation",
    description: "Occupation",
    href: "/profile/edit/details/occupation",
  },
  {
    name: "Education",
    description: "Education",
    href: "/profile/edit/details/education",
  },
  {
    name: "Social Links",
    description: "Social Links",
    href: "/profile/edit/details/sociallinks",
  }
];

export const mockAppearanceLinks = [
  {
    name: "Photo",
    description: "Photo",
    href: "/profile/edit/appearance/photo",
  },
  // {
  //   name: "Design",
  //   description: "Design",
  //   href: "/profile/edit/appearance/design",
  // },
  // {
  //   name: "Color",
  //   description: "Color",
  //   href: "/profile/edit/appearance/color",
  // },
];

export const mockAccountLinks = [
  {
    name: "Name",
    description: "Name",
    href: "/profile/edit/account/name",
  },
  {
    name: "Email & Password",
    description: "Email & Password",
    href: "/profile/edit/account/email-password",
  },
  {
    name: "Phone Settings",
    description: "Phone Settings",
    href: "/profile/edit/account/phone-settings",
  },
  {
    name: "Notification Preferences",
    description: "Notification Preferences",
    href: "/profile/edit/account/notification-preferences",
  },
  {
    name: "Support",
    description: "Support",
    href: "/profile/edit/account/support",
  },
];
