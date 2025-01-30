"use client";
import React from "react";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "./button";
interface Props {
  label: string;
  icon: "heart" | "message";
}

const IconButton = ({ label, icon }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            console.log("test");
          }}
          size={"icon"}
          variant={"outline"}
        >
          {icon === "heart" && <Heart />}
          {icon === "message" && <MessageCircle />}
        </Button>
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
};

export default IconButton;
