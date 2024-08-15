import { forwardRef, useId } from "react";

interface InputProps {
  label: string;
  type: string;
  className?: string;
  placeholder?: string;
  props?: {};
}

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    placeholder = "",
    ...props
  }: InputProps,
  ref: any
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className={`inline-block mb-1 pl-1 text-xl font-semibold`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        id={id}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
});

export default Input;
