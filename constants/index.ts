import { Bell, House, Plus, Search, User } from "lucide-react";

interface BottomLink {
  href: string;
  label: string;
  Icon: typeof Bell;
}

export const bottomNavLinks: BottomLink[] = [
  {
    href: "/",
    label: "Home",
    Icon: House,
  },
  {
    href: "/search",
    label: "Search",
    Icon: Search,
  },
  {
    href: "/new",
    label: "Write",
    Icon: Plus,
  },
  {
    href: "/alerts",
    label: "Alerts",
    Icon: Bell,
  },
  {
    href: "redirect-profile",
    label: "Profile",
    Icon: User,
  },
];
