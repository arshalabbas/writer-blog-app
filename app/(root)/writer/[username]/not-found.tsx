import { UserX } from "lucide-react";
import React from "react";

const NotFound = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center">
      <UserX size={100} />
      <h1 className="mb-5 text-center text-5xl font-bold">User Not Found</h1>
      <p className="max-w-80 text-center text-xl text-muted-foreground">
        The User you&apos;re looking for might have been renamed or deleted
        their account.
      </p>
    </div>
  );
};

export default NotFound;
