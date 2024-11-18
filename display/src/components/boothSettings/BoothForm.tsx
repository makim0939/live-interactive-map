import { useAtom } from "jotai";
import type { UseFormReturn } from "react-hook-form";
import { ratioAtom } from "../../atoms";
import useBoothMutation from "../../hooks/useBoothMutation";
import type { BoothInsertProps } from "../../types";
import Button from "../ui/Button";
import NumberInput from "../ui/NumberInput";
import TextInput from "../ui/TextInput";
import type { BoothFormState } from "./BoothSettings";

type AddBoothFormProps = {
  hookForm: UseFormReturn<BoothInsertProps, undefined>;
  setOpenForm: React.Dispatch<React.SetStateAction<BoothFormState>>;
};

const AddBoothForm = (props: AddBoothFormProps) => {
  const [ratio] = useAtom(ratioAtom);
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = props.hookForm;

  const mutation = useBoothMutation();
  const onValid = (data: BoothInsertProps) => {
    data.left = data.left / ratio;
    data.top = data.top / ratio;
    data.width = data.width / ratio;
    data.height = data.height / ratio;
    mutation.mutate(data);
    reset();
    props.setOpenForm("none");
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

export default AddBoothForm;
