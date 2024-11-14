import React, { useState } from 'react';
import TextInput from './ui/TextInput';
import Button from './ui/Button';
import NumberInput from './ui/NumberInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { insertBooth, selectAllBooths } from '../utils/supabaseFunctions';
import { supabase } from '../utils/supabaseClient';
import { Booth, BoothInsertProps } from '../types';

type Rect = { left: number; top: number; width: number; height: number };
const BoothSettingForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [left, setLeft] = useState<number | ''>('');
  const [top, setTop] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');

  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['booths'], queryFn: selectAllBooths });

  const mutation = useMutation({
    mutationFn: async (data: BoothInsertProps) => {
      return await insertBooth(data);
    },
    onSuccess: (result) => {
      if (!result) return;
      queryClient.setQueryData<Booth[]>(['booths'], (old) => (old ? [...old, result] : [result]));
    },
  });

  const resetForm = () => {
    setName('');
    setDescription('');
    setLeft('');
    setTop('');
    setWidth('');
    setHeight('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setHeight('');
    e.preventDefault();
    if (!name || !description || !left || !top || !width || !height) {
      console.log('no value');
      return;
    }
    mutation.mutate({
      name,
      description,
      left,
      top,
      width,
      height,
    });
    resetForm();
  };
  return (
    <div id="form" className=" w-96 p-4 ">
      <h2 className=" text-2xl font-semibold">ブースを追加</h2>
      <form onSubmit={handleSubmit} className=" flex flex-col ">
        <div className=" flex flex-col my-4 ">
          <label htmlFor="name">ブース名</label>
          <TextInput
            name="name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className=" flex flex-col my-4">
          <label htmlFor="description">ブース説明</label>
          <TextInput
            name="description"
            id="description"
            type="textarea"
            value={description}
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
                      value={left}
                      onChange={(e) => setLeft(e.target.value ? e.target.valueAsNumber : '')}
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
                      value={top}
                      onChange={(e) => setTop(e.target.value ? e.target.valueAsNumber : '')}
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
                      value={width}
                      onChange={(e) => setWidth(e.target.value ? e.target.valueAsNumber : '')}
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
                      value={height}
                      onChange={(e) => setHeight(e.target.value ? e.target.valueAsNumber : '')}
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
