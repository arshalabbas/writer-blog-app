import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Bell, Plus, Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 flex h-[56px] w-full items-center justify-between border-b-[.5px] border-slate-400/30 bg-white px-10 sm:h-[65px]">
      {/* Left Nav */}
      <div className="flex items-center gap-5 md:gap-10">
        <Image
          src={"/Logo.svg"}
          alt="Logo"
          width={105}
          height={40}
          className="aspect-auto w-[60px] object-contain sm:w-[80px] md:h-[40px] md:w-[105px]"
        />
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
        <div className="flex items-center gap-2">
          <Button>
            <Plus /> Write
          </Button>
          <Button size={"icon"} variant={"outline"}>
            <Bell />
          </Button>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
