import React from 'react';

const NumberInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...inputAttrs } = props;
  return (
    <input
      {...inputAttrs}
      className={` w-16 p-1 border border-borderlightgray  ${className || ''}`}
    />
  );
};

export default NumberInput;
