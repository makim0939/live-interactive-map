import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { type Booth, Favorite, type Rect } from "../../../types";

export const favoriteAnimation = (
  field: HTMLDivElement,
  targetBooth: Booth,
  contentsRect: Rect,
) => {
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
