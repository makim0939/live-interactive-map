import { UseFormReturn } from 'react-hook-form';
import TextInput from '../ui/TextInput';
import NumberInput from '../ui/NumberInput';
import Button from '../ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Booth, BoothInsertProps } from '../../types';
import { insertBooth } from '../../utils/supabaseFunctions';

type BoothFormProps = {
  hookForm: UseFormReturn<BoothInsertProps, undefined>
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const BoothForm = (props: BoothFormProps) => {
const {
  register,
  handleSubmit,
  reset,
  // formState: { errors },
} = props.hookForm;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: BoothInsertProps) => {
      return await insertBooth(data);
    },
    onSuccess: (result) => {
      if (!result) return;
      queryClient.setQueryData<Booth[]>(['booths'], (old) => (old ? [...old, result] : [result]));
    },
  });

  const onValid = (data: BoothInsertProps) => {
    console.log(data);
    mutation.mutate(data);
    reset();
    props.setIsFormOpen(false);
  };

  return (
    <>
      <div id="form" className="  w-96 p-4 ">
        <h2 className=" text-2xl font-semibold">ブースを追加</h2>
        <form onSubmit={handleSubmit(onValid)} className=" flex flex-col ">
          <div className=" flex flex-col my-4 ">
            <label htmlFor="name">ブース名</label>
            <TextInput
              name="name"
              id="name"
              type="text"
              register={register}
              registerOptions={{ required: true }}
            />
          </div>
          <div className=" flex flex-col my-4">
            <label htmlFor="description">ブース説明</label>
            <TextInput
              name="description"
              id="description"
              type="textarea"
              register={register}
              registerOptions={{ required: true }}
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
                        className=" w-4/5"
                        register={register}
                        registerOptions={{ required: true }}
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
                        className=" w-4/5"
                        register={register}
                        registerOptions={{ required: true }}
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
                        className=" w-4/5"
                        register={register}
                        registerOptions={{ required: true }}
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
                        className=" w-4/5"
                        register={register}
                        registerOptions={{ required: true }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className=" flex justify-end my-4">
            <Button type="submit" text="追加" />
          </div>
        </form>
      </div>
    </>
  );
};

export default BoothForm;
