import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import favoriteSvg from "../../assets/favFill.svg";
import { contentsRectAtom, ratioAtom } from "../../atoms";
import type { BoothInsertProps, Favorite } from "../../types";
import { supabase } from "../../utils/supabaseClient";
import { selectAllBooths } from "../../utils/supabaseFunctions";
import Draggable from "../ui/Draggable";
import BoothForm from "./BoothForm";
import BoothList from "./BoothList";
import BoothRectStage from "./BoothRectStage";
import EditBoothForm from "./EditBoothForm";
import { favoriteAnimation } from "./functions/favoriteAnimation";

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

  const favAnimationContainer = useRef<HTMLDivElement>(null);
  const [contentsRect] = useAtom(contentsRectAtom);

  useEffect(() => {
    const onClientFavorite = (payload: RealtimePostgresChangesPayload<Favorite>) => {
      const field = favAnimationContainer.current;
      if (!field) return;
      if (!("booth_id" in payload.new)) return;
      const targetBoothId = payload.new.booth_id;
      const targetBooth = boothsQuery.data?.find((booth) => booth.id === targetBoothId);
      if (!targetBooth) return;
      favoriteAnimation(field, targetBooth, contentsRect);
    };

    const channel = supabase.channel("favorites").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "favorites",
      },
      onClientFavorite,
    );
    const subscribe = channel.subscribe();
    return () => {
      subscribe.unsubscribe().then((result) => {
        if (result === "error") throw new Error("Failed to unsubscribe");
        if (result === "timed out") throw new Error("Unsubscribe timed out");
      });
    };
  }, [boothsQuery.data, contentsRect]);
  return (
    <div className=" absolute top-0 left-0">
      <Draggable>
        <div className=" flex bg-slate-50 ">
          <BoothList
            booths={boothsQuery.data || []}
            setSelectedBoothId={setSelectedBoothId}
            openFormState={[openForm, setOpenForm]}
            reset={hookForm.reset}
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
      <div className=" absolute left-0 top-0 " ref={favAnimationContainer} />
    </div>
  );
};

export default BoothSettings;
