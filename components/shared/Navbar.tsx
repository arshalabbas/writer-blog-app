import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Bell,
  LogOut,
  Plus,
  Search,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { fallbackAvatar } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="fixed left-0 top-0 z-10 flex h-[56px] w-full items-center justify-between border-b-[.5px] border-slate-400/30 bg-background px-10 sm:h-[65px]">
      {/* Left Nav */}
      <div className="flex items-center gap-5 md:gap-10">
        <Link href={"/"}>
          <Image
            src={"/Logo.svg"}
            alt="Logo"
            width={105}
            height={40}
            className="aspect-auto w-[60px] object-contain sm:w-[80px] md:h-[40px] md:w-[105px]"
          />
        </Link>
        <div className="hidden sm:flex">
          <Input
            className="hidden w-[350px] md:block"
            placeholder="Search writes..."
          />
          <Button className="flex md:hidden" size={"icon"} variant={"outline"}>
            <Search />
          </Button>
        </div>
      </div>

      {/* Right Nav */}

      <div className="hidden items-center gap-5 sm:flex">
        {session ? (
          <>
            <div className="flex items-center gap-2">
              <Link href={"/new"}>
                <Button>
                  <Plus /> Write
                </Button>
              </Link>
              <Button size={"icon"} variant={"outline"}>
                <Bell />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={session.user?.image ?? undefined} />
                  <AvatarFallback>
                    {fallbackAvatar(session.user.username)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={"/profile"}>
                    <User /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/settings"}>
                    <Settings /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/api/auth/signout"}>
                    <LogOut /> Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex gap-2">
            <Link href={"/signup"}>
              <Button variant={"outline"}>
                <UserPlus />
                Sign Up
              </Button>
            </Link>
            <Link href={"/login"}>
              <Button>
                <User />
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
