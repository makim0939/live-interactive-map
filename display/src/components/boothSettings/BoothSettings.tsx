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
        const field = favIconContainer.current;
        if (!field) return;
        field.style.width = "100px";
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="none"  xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_31_45" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_31_45)">
            <path d="M12 20.825L10.9 19.825C9.23333 18.325 7.85833 17.0334 6.775 15.95C5.69167 14.8667 4.83333 13.904 4.2 13.062C3.56667 12.2207 3.125 11.454 2.875 10.762C2.625 10.0707 2.5 9.36669 2.5 8.65002C2.5 7.23336 2.97933 6.04569 3.938 5.08702C4.896 4.12902 6.08333 3.65002 7.5 3.65002C8.36667 3.65002 9.19167 3.85402 9.975 4.26202C10.7583 4.67069 11.4333 5.25836 12 6.02502C12.5667 5.25836 13.2417 4.67069 14.025 4.26202C14.8083 3.85402 15.6333 3.65002 16.5 3.65002C17.9167 3.65002 19.104 4.12902 20.062 5.08702C21.0207 6.04569 21.5 7.23336 21.5 8.65002C21.5 9.36669 21.375 10.0707 21.125 10.762C20.875 11.454 20.4333 12.2207 19.8 13.062C19.1667 13.904 18.3083 14.8667 17.225 15.95C16.1417 17.0334 14.7667 18.325 13.1 19.825L12 20.825Z" />
          </g>
        </svg>`;

        const randomSize = Math.floor(Math.random() * innerWidth * 0.03);
        const randomRed = Math.floor(Math.random() * 20) - 10;
        const randomGreen = Math.floor(Math.random() * 50) - 25;
        const randomBlue = Math.floor(Math.random() * 50) - 20;
        const randomDuration = Math.floor(Math.random() * 1000) + 500;
        const svg = container.querySelector("svg");
        if (!svg) return;
        const red = 235 + randomRed;
        const green = 50 + randomGreen;
        const blue = 20 + randomBlue;
        svg?.setAttribute("fill", `rgba(${red},${green},${blue}, 1)`);
        svg?.setAttribute("width", `${32 + randomSize}`);
        svg?.setAttribute("height", `${32 + randomSize}`);
        const targetBooth = boothsQuery.data?.find((booth) => booth.id === targetBoothId);
        if (!targetBooth) return;
        const randomX = Math.floor(Math.random() * (targetBooth.width * 0.8));
        const randomY = Math.floor(Math.random() * 50);

        container.style.transition = ` all ${randomDuration}ms ease-in-out`;
        field.appendChild(container);
        container.style.left = `${contentsRect.left + targetBooth.left + randomX}px`;
        container.style.top = `${contentsRect.top + targetBooth.top}px`;
        container.style.opacity = "0";

        setTimeout(() => {
          container.style.opacity = "1";
          container.style.transform = `translateY(${-120 + randomY / 2}px)`;
        }, 50);
        setTimeout(() => {
          container.style.opacity = "0";
          container.style.transform = `translateY(${-150 + randomY / 2}px)`;
        }, randomDuration + 50);
        setTimeout(
          () => {
            container.style.transform = "translateY(0)";
            field.removeChild(container);
          },
          randomDuration * 2 + 50,
        );
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
