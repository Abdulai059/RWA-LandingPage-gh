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
  cta: { label: "SUBMIT YOUR ABSTRACT", href: "#submit" },
  secondary: { label: "Browse research subthemes", href: "#subthemes" },
} as const;

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Why Attend", href: "#experience" },
  { label: "Speakers", href: "#speakers" },
  { label: "Programme", href: "#programme" },
  { label: "FAQs", href: "#faqs" },
];
