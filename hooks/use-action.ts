import { useState } from "react";

const useAction = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const execute = async (action: () => Promise<void>) => {
    setIsPending(true);
    try {
      await action();
      setIsPending(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unexpected error occured",
      );
    }
  };

  return { execute, isPending, error };
};

export default useAction;
