import type { NavLink } from "@/components/Navbar";

export const hero = {
  siteName: "ARWATS 2027",
  badge: "Call for Papers is open",
  fullName: "Africa RWA & Tokenization Summit",
  shortName: "(ARWATS 2027)",
  slogan: "Unlocking Africa’s Assets. Powering Tomorrow’s Wealth.",
  theme:
    "Tokenizing Africa’s Real-World Assets for Intra-African Trade, Investment and Economic Transformation under the AfCFTA.",
  location: "Accra, Ghana",
  date: "February 2027",
  dateNote: "exact date to be confirmed",
  cta: { label: "SUBMIT YOUR RESEARCH", href: "/submit" },
  secondary: { label: "Read the Call for Papers", href: "/call-for-papers" },
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Call for Papers", href: "/call-for-papers" },
  // { label: "Speakers", href: "/#speakers" },
  // { label: "Programme", href: "/#programme" },
  // { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];
