import { forwardRef, useEffect, ReactNode, RefObject } from "react";

interface CheckboxInputProps {
  className?: string;
  name: string;
  id: string;
  value: string;
  checked?: boolean;
  data: any;
  setData: (key: string, value: any) => void;
  [key: string]: any;
}

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  (
    {
      className = "",
      name,
      id,
      value,
      checked = false,
      data,
      setData,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (!data?.[name]) {
        setData(name, []);
      }
    }, [data, name, setData]);

    const handleChange = () => {
      const currentValues = data?.[name] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v: string) => v !== value)
        : [...currentValues, value];

      setData(name, newValues);
    };

    const isChecked = data?.[name]?.includes(value);
    return (
      <input
        {...props}
        type="checkbox"
        className={`rounded-md shadow-sm ${className}`}
        checked={isChecked}
        value={value}
        name={name}
        id={id}
        onChange={handleChange}
        ref={ref as RefObject<HTMLInputElement>}
      />
    );
  }
);

export { CheckboxInput };
