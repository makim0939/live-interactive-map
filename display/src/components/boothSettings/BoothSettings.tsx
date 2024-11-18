import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ratioAtom } from "../../atoms";
import type { BoothInsertProps } from "../../types";
import { selectAllBooths } from "../../utils/supabaseFunctions";
import Draggable from "../ui/Draggable";
import BoothForm from "./BoothForm";
import BoothList from "./BoothList";
import BoothRectStage from "./BoothRectStage";
import EditBoothForm from "./EditBoothForm";

export type BoothFormState = "none" | "add" | "edit";
const BoothSettings = () => {
  const [ratio] = useAtom(ratioAtom);
  const hookForm = useForm<BoothInsertProps>();
  const boothsQuery = useQuery({
    queryKey: ["booths"],
    queryFn: selectAllBooths,
    select: (data) =>
      data?.map((booth) => ({
        ...booth,
        left: booth.left * ratio,
        top: booth.top * ratio,
        width: booth.width * ratio,
        height: booth.height * ratio,
      })),
  });
  const [openForm, setOpenForm] = useState<BoothFormState>("none");
  const [selectedBoothId, setSelectedBoothId] = useState(-1);
  const selectedBooth = boothsQuery.data?.find((booth) => booth.id === selectedBoothId);
  return (
    <div className=" absolute top-0 left-0">
      <Draggable>
        <div className=" flex bg-slate-50 ">
          <BoothList
            booths={boothsQuery.data || []}
            setSelectedBoothId={setSelectedBoothId}
            openFormState={[openForm, setOpenForm]}
          />
          {openForm === "add" && <BoothForm hookForm={hookForm} setOpenForm={setOpenForm} />}
          {openForm === "edit" && selectedBooth && (
            <EditBoothForm
              hookForm={hookForm}
              setOpenForm={setOpenForm}
              booth={selectedBooth}
              setSelectBoothId={setSelectedBoothId}
            />
          )}
        </div>
      </Draggable>
      <BoothRectStage
        boothRects={boothsQuery.data || []}
        hookForm={hookForm}
        openForm={openForm}
        selectedBoothId={selectedBoothId}
      />
    </div>
  );
};

export default BoothSettings;
