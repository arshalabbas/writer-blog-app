"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { ArrowLeft } from "lucide-react";

const Back = ({ ...props }: ButtonProps) => {
  const router = useRouter();
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
      size={"icon"}
      variant={"ghost"}
      {...props}
    >
      <ArrowLeft></ArrowLeft>
    </Button>
  );
};

export default Back;
