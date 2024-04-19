import { forwardRef, useEffect, useRef, ReactNode, RefObject } from "react";

interface TextAreaInputProps {
  className?: string;
  isFocused?: boolean;
  children?: ReactNode;
  [key: string]: any; // This allows for any additional props
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ className = "", isFocused = false, children, ...props }, ref) => {
    const input = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (isFocused) {
        input.current?.focus();
      }
    }, []);

    return (
      <textarea
        {...props}
        className={
          "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
          className
        }
        rows={5}
        ref={ref as RefObject<HTMLTextAreaElement>}
      >
        {children}
      </textarea>
    );
  }
);

export default TextAreaInput;
