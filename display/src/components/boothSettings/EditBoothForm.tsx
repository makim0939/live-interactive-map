import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import useUpdateBoothMutation from "../../hooks/useUpdateBoothMutation";
import type { Booth, BoothInsertProps } from "../../types";
import Button from "../ui/Button";
import NumberInput from "../ui/NumberInput";
import TextInput from "../ui/TextInput";
import type { BoothFormState } from "./BoothSettings";

type EditBoothFormProps = {
  hookForm: UseFormReturn<BoothInsertProps, undefined>;
  setOpenForm: React.Dispatch<React.SetStateAction<BoothFormState>>;
  booth: Booth;
  setSelectBoothId: React.Dispatch<React.SetStateAction<number>>;
};

const EditBoothForm = (props: EditBoothFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // formState: { errors },
  } = props.hookForm;

  const mutation = useUpdateBoothMutation();
  const onValid = (data: BoothInsertProps) => {
    const updateData = { id: props.booth.id, ...data };
    const onSuccess = () => {
      reset();
      props.setSelectBoothId(-1);
      props.setOpenForm("none");
    };
    mutation.mutate(updateData, { onSuccess });
  };

  useEffect(() => {
    setValue("name", props.booth.name);
    setValue("description", props.booth.description);
    setValue("left", props.booth.left);
    setValue("top", props.booth.top);
    setValue("width", props.booth.width);
    setValue("height", props.booth.height);
  }, [props.booth, setValue]);

  return (
    <>
      <div id="form" className="  w-96 p-4 ">
        <h2 className=" text-2xl font-semibold">ブースを編集</h2>
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
            <Button type="submit" text="更新" />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBoothForm;
