"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const logout = () => {
    signOut();
  };
  return (
    <Button variant={"destructive"} onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
