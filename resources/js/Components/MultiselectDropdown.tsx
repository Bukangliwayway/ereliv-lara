import React, { useState, useEffect, useRef } from "react";

interface Option {
  id: string;
  name: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  data: any;
  setData: (data: any) => void;
  name: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  data,
  setData,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    data[name] || []
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (optionValue: string) => {
    let newSelectedOptions: string[];
    if (selectedOptions.includes(optionValue)) {
      newSelectedOptions = selectedOptions.filter(
        (option) => option !== optionValue
      );
    } else {
      newSelectedOptions = [...selectedOptions, optionValue];
    }
    setSelectedOptions(newSelectedOptions);
    setData({ ...data, [name]: newSelectedOptions });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={toggleDropdown}
      >
        {selectedOptions.length === 0
          ? "Select options"
          : `${selectedOptions.length} option(s) selected`}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          <div className="py-1">
            {options.map((option) => (
              <div key={option.id} className="px-4 py-2 flex items-center">
                <input
                  type="checkbox"
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleOptionChange(option.id)}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label
                  htmlFor={option.id}
                  className="ml-2 block text-sm leading-5 text-gray-700"
                >
                  {option.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
