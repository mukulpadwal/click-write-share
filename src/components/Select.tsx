import { forwardRef, useId } from "react";

interface SelectProps {
  label: string;
  options: [];
  className: string;
}

function Select(
  { label, options = [], className = "", ...props }: SelectProps,
  ref: any
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        ref={ref}
        {...props}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
