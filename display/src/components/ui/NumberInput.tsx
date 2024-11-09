import React from 'react';

type NumberInputProps = {
  name: string;
  id: string;
  className?: string;
};
const NumberInput = (props: NumberInputProps) => {
  return (
    <input
      name={props.name}
      id={props.id}
      type="number"
      className={` w-16 p-1 border border-borderlightgray  ${props.className || ''}`}
    />
  );
};

export default NumberInput;
