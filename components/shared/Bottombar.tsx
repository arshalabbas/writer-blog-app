import { bottomNavLinks } from "@/constants";
import { auth } from "@/lib/auth";
import { cn, fallbackAvatar } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Bottombar = async () => {
  const session = await auth();
  return (
    <div className="fixed bottom-0 left-0 z-10 flex h-[62px] w-full items-center justify-between border-t-[.5px] border-slate-400/30 bg-background px-5 sm:hidden">
      {bottomNavLinks.map((link) => {
        const activeLink = "/";
        const isProfile = link.href === "redirect-profile";
        return (
          <Link
            href={
              isProfile && session
                ? `/writer/${session?.user.username}`
                : isProfile
                  ? "/login"
                  : link.href
            }
            className={cn("flex flex-col items-center rounded-md p-2", {
              "bg-primary": link.label === "Write",
              "bg-secondary": link.href === activeLink,
            })}
            key={link.label}
          >
            {isProfile && session ? (
              <Avatar className="size-8">
                <AvatarImage src={session.user.image} />
                <AvatarFallback>
                  {fallbackAvatar(session.user.username)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <link.Icon
                className={cn("stroke-primary", {
                  "stroke-primary-foreground": link.label === "Write",
                })}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Bottombar;
