import React, { useState } from 'react';
import TextInput from './ui/TextInput';
import Button from './ui/Button';
import NumberInput from './ui/NumberInput';

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
    <div id="form" className=" w-96 p-4 ">
      <h2 className=" text-2xl font-semibold">ブースを追加</h2>
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
          <div id="position" className=" ">
            <table className=" w-full border-separate border-spacing-y-4 ">
              <tbody>
                <tr>
                  <td className=" w-5 ">
                    <label htmlFor="left">x</label>
                  </td>
                  <td>
                    <NumberInput
                      name="left"
                      id="left"
                      type="number"
                      onChange={(e) => setLeft(e.target.valueAsNumber)}
                      className=" w-4/5"
                    />
                  </td>
                  <td className=" w-5 ">
                    <label htmlFor="top">y</label>
                  </td>
                  <td>
                    <NumberInput
                      name="top"
                      id="top"
                      type="number"
                      onChange={(e) => setTop(e.target.valueAsNumber)}
                      className=" w-4/5"
                    />
                  </td>
                </tr>
                <tr>
                  <td className=" w-5 ">
                    <label htmlFor="width">w</label>
                  </td>
                  <td>
                    <NumberInput
                      name="width"
                      id="width"
                      type="number"
                      onChange={(e) => setWidth(e.target.valueAsNumber)}
                      className=" w-4/5"
                    />
                  </td>
                  <td className=" w-5 ">
                    <label htmlFor="height">h</label>
                  </td>
                  <td>
                    <NumberInput
                      name="height"
                      id="height"
                      type="number"
                      onChange={(e) => setHeight(e.target.valueAsNumber)}
                      className=" w-4/5"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
