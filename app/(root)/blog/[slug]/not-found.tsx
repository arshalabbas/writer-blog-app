import { FileX } from "lucide-react";
import React from "react";

const NotFound = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center">
      <FileX size={100} />
      <h1 className="mb-5 text-center text-5xl font-bold">Blog Not Found</h1>
      <p className="max-w-80 text-center text-xl text-muted-foreground">
        The Blog you&apos;re looking for might have been moved or deleted.
      </p>
    </div>
  );
};

export default NotFound;
