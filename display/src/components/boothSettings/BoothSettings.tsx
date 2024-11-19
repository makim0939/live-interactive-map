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

  const favIconContainer = useRef<HTMLDivElement>(null);
  const [contentsRect] = useAtom(contentsRectAtom);

  const onClientFavorite = useCallback(
    (payload: RealtimePostgresChangesPayload<Favorite>) => {
      const favoriteAnimation = (targetBoothId: number) => {
        const container = favIconContainer.current;
        if (!container) return;
        container.style.width = "32px";
        const favIcon = document.createElement("img");
        favIcon.src = favoriteSvg;
        favIcon.style.position = "absolute";
        favIcon.width = 32;
        favIcon.height = 32;
        favIcon.style.width = "32px";
        favIcon.style.height = "32px";
        favIcon.style.transition = " all 1s ease-in-out";
        container.appendChild(favIcon);
        const targetBooth = boothsQuery.data?.find((booth) => booth.id === targetBoothId);
        if (!favIcon || !targetBooth) return;
        favIcon.style.left = `${contentsRect.left + targetBooth.left}px`;
        favIcon.style.top = `${contentsRect.top + targetBooth.top}px`;
        favIcon.style.opacity = "0";

        setTimeout(() => {
          favIcon.style.opacity = "1";
          favIcon.style.transform = "translateY(-120px)";
        }, 100);
        setTimeout(() => {
          favIcon.style.opacity = "0";
          favIcon.style.transform = "translateY(-150px)";
        }, 1100);
        setTimeout(() => {
          favIcon.style.transform = "translateY(0)";
          container.removeChild(favIcon);
        }, 2100);
      };
      if (!("booth_id" in payload.new)) return;
      favoriteAnimation(payload.new.booth_id);
    },
    [boothsQuery.data, contentsRect],
  );
  useEffect(() => {
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
  }, [onClientFavorite]);
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
      <div className=" absolute left-0 top-0 " ref={favIconContainer} />
    </div>
  );
};

export default BoothSettings;
