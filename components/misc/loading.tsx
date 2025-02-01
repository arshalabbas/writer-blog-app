import React from "react";

const Loading = ({ isLoading = false }: { isLoading: boolean }) => {
  if (!isLoading) return null;
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-white/50">
      <span className="text-2xl font-semibold">Loading...</span>
    </div>
  );
};

export default Loading;
