import { MyInfo } from "app/types";

export type PageQuery = {
  error?: string;
};

export enum OnboardingStep {
  Username = "username",
  Picture = "picture",
  Preferences = "preferences",
  Social = "social",
}

export type OnboardingContextType = {
  step: OnboardingStep;
  setStep: (step: OnboardingStep) => void;
  user?: MyInfo;
};

export interface UserOnboardingData {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  age: string;
  state: string;
  district: string;
  pincode: string;
  interests: string[];
  email: string;
  phone: string;
  termsAccepted: boolean;
}

export interface InterestType {
  id: string;
  label: string;
  icon: string;
}

export const MOCK_INTERESTS: InterestType[] = [
  { id: "music", label: "Music", icon: "Play" },
  { id: "sports", label: "Sports", icon: "Hot" },
  { id: "technology", label: "Technology", icon: "Settings" },
  { id: "art", label: "Art", icon: "CreatorChannel" },
  { id: "fashion", label: "Fashion", icon: "User" },
  { id: "gaming", label: "Gaming", icon: "Plus" },
  { id: "food", label: "Food", icon: "Home" },
  { id: "travel", label: "Travel", icon: "Plus" },
  { id: "movies", label: "Movies", icon: "Play" },
  { id: "social", label: "Social", icon: "Instagram" }
];

export const STATES = [
  "California",
  "New York",
  "Texas",
  "Florida",
  "Illinois",
];

export const DISTRICTS: { [key: string]: string[] } = {
  "California": ["Los Angeles", "San Francisco", "San Diego"],
  "New York": ["Manhattan", "Brooklyn", "Queens"],
  "Texas": ["Houston", "Austin", "Dallas"],
  "Florida": ["Miami", "Orlando", "Tampa"],
  "Illinois": ["Chicago", "Springfield", "Aurora"],
};
