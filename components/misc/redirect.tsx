"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface Props extends React.ComponentProps<"button"> {
  href: string;
  children: React.ReactNode;
}

const Redirect = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, href, ...props }, ref) => {
    const router = useRouter();
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          router.push(href);
        }}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Redirect.displayName = "Redirect";

export default Redirect;
