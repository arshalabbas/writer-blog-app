import { bottomNavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Bottombar = () => {
  return (
    <div className="fixed bottom-0 left-0 flex h-[62px] w-full items-center justify-between border-t-[.5px] border-slate-400/30 px-5 sm:hidden">
      {bottomNavLinks.map((link) => {
        const activeLink = "/";
        return (
          <Link
            href={link.href}
            className={cn("flex flex-col items-center rounded-md p-2", {
              "bg-primary": link.label === "Write",
              "bg-secondary": link.href === activeLink,
            })}
            key={link.label}
          >
            <link.Icon
              className={cn("stroke-primary", {
                "stroke-primary-foreground": link.label === "Write",
              })}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Bottombar;
