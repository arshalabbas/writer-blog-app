"use client";
import React from "react";
import { Heart, MessageCircle } from "lucide-react";
import { Button, ButtonProps } from "./button";
interface Props extends ButtonProps {
  label: string;
  icon: "heart" | "message";
}

const IconButton = ({ label, icon, ...props }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Button {...props} size={"icon"} variant={"outline"}>
          {icon === "heart" && <Heart />}
          {icon === "message" && <MessageCircle />}
        </Button>
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
};

export default IconButton;
