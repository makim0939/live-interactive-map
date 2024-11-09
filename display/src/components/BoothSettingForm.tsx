import React from 'react';
import TextInput from './ui/TextInput';
import Button from './ui/Button';
import NumberInput from './ui/NumberInput';

const BoothSettingForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="absolute top-0 left-0 z-20 p-8 bg-bgwhite rounded-lg ">
      <h2 className=" text-center text-2xl font-semibold">ブースを追加</h2>
      <form action="" onSubmit={handleSubmit} className=" flex flex-col ">
        <div className=" flex flex-col my-4 ">
          <label htmlFor="title">ブース名</label>
          <TextInput name="title" id="title" type="text" />
        </div>
        <div className=" flex flex-col my-4">
          <label htmlFor="description">ブース説明</label>
          <TextInput name="description" id="description" type="textarea" />
        </div>
        <div className=" flex flex-col my-4">
          <label htmlFor="position">配置</label>
          <div id="position">
            <div className=" flex justify-around my-4">
              <div className=" w-1/3">
                <label htmlFor="left">x: </label>
                <NumberInput name="left" id="left" className=" w-4/5 " />
              </div>
              <div className=" w-1/3">
                <label htmlFor="top">y: </label>
                <NumberInput name="top" id="top" className=" w-4/5 " />
              </div>
            </div>
            <div className=" flex justify-around my-4">
              <div className=" w-1/3">
                <label htmlFor="width">w: </label>
                <NumberInput name="width" id="width" className=" w-4/5 " />
              </div>
              <div className=" w-1/3">
                <label htmlFor="height">h: </label>
                <NumberInput name="height" id="height" className=" w-4/5 " />
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
