import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

type BlogInputProps = {
  initialHeight?: number;
} & React.ComponentProps<"textarea"> &
  VariantProps<typeof inputStyles>;

const BlogInput = React.forwardRef<HTMLTextAreaElement, BlogInputProps>(
  ({ initialHeight = 0, className, textType, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Auto-grow functionality
    React.useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        const adjustHeight = () => {
          textarea.style.height = "0";
          textarea.style.height = `${Math.max(initialHeight, textarea.scrollHeight)}px`;
        };

        textarea.addEventListener("input", adjustHeight);
        adjustHeight(); // Adjust height on initial render

        return () => {
          textarea.removeEventListener("input", adjustHeight);
        };
      }
    }, [initialHeight]);

    return (
      <div className={cn(containerStyles({ textType }))}>
        <textarea
          ref={(node) => {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            textareaRef.current = node;
          }}
          className={cn(inputStyles({ textType }), className)}
          {...props}
        />
      </div>
    );
  },
);
BlogInput.displayName = "BlogInput";

export { BlogInput };

const inputStyles = cva("outline-none border-none w-full resize-none", {
  variants: {
    textType: {
      title: "text-3xl md:text-5xl font-bold",
      subtle: "text-xl md:text-2xl font-bold",
      description: "text-lg md:text-xl font-input",
    },
  },
  defaultVariants: {
    textType: "subtle",
  },
});

const containerStyles = cva("", {
  variants: {
    textType: {
      title: "border-b border-primary-background",
      subtle: "border-b border-primary-background",
      description: "",
    },
  },
  defaultVariants: {
    textType: "subtle",
  },
});
