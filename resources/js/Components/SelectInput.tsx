import { forwardRef, useRef, ReactNode, RefObject } from "react";

interface SelectInputProps {
  className?: string;
  children?: ReactNode;
  [key: string]: any; // This allows for any additional props
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className = "", children, ...props }, ref) => {
    const input = useRef<HTMLSelectElement>(null);

    return (
      <select
        {...props}
        className={
          "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm" +
          className
        }
        ref={ref as RefObject<HTMLSelectElement>}
      >
        {children}
      </select>
    );
  }
);

export default SelectInput;
