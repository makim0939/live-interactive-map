import React, { useState } from 'react';
import TextInput from './ui/TextInput';
import Button from './ui/Button';
import NumberInput from './ui/NumberInput';

type BoothSettingsInputs = {
  title: string;
  description: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

const BoothSettingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, description, left, top, width, height });
  };
  return (
    <div className="absolute top-0 left-0 z-20 p-8 bg-bgwhite rounded-lg ">
      <h2 className=" text-center text-2xl font-semibold">ブースを追加</h2>
      <form onSubmit={handleSubmit} className=" flex flex-col ">
        <div className=" flex flex-col my-4 ">
          <label htmlFor="title">ブース名</label>
          <TextInput
            name="title"
            id="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className=" flex flex-col my-4">
          <label htmlFor="description">ブース説明</label>
          <TextInput
            name="description"
            id="description"
            type="textarea"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className=" flex flex-col my-4">
          <label htmlFor="position">配置</label>
          <div id="position">
            <div className=" flex justify-around my-4">
              <div className=" w-1/3">
                <label htmlFor="left">x: </label>
                <NumberInput
                  name="left"
                  id="left"
                  type="number"
                  className=" w-4/5 "
                  onChange={(e) => setLeft(e.target.valueAsNumber)}
                />
              </div>
              <div className=" w-1/3">
                <label htmlFor="top">y: </label>
                <NumberInput
                  name="top"
                  id="top"
                  type="number"
                  className=" w-4/5 "
                  onChange={(e) => setTop(e.target.valueAsNumber)}
                />
              </div>
            </div>
            <div className=" flex justify-around my-4">
              <div className=" w-1/3">
                <label htmlFor="width">w: </label>
                <NumberInput
                  name="width"
                  id="width"
                  type="number"
                  className=" w-4/5 "
                  onChange={(e) => setWidth(e.target.valueAsNumber)}
                />
              </div>
              <div className=" w-1/3">
                <label htmlFor="height">h: </label>
                <NumberInput
                  name="height"
                  id="height"
                  type="number"
                  className=" w-4/5 "
                  onChange={(e) => setHeight(e.target.valueAsNumber)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-end my-4">
          <Button text="追加" />
        </div>
      </form>
    </div>
  );
};

export default BoothSettingForm;
