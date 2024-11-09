import React from 'react';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};
const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`w-fit px-4 py-1 rounded-sm bg-blue-600 text-white ${props.className || ''}`}
    >
      {props.text}
    </button>
  );
};

export default Button;
