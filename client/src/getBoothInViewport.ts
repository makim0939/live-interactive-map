/*
現在採用している手法
- 画面に占めるブース面積の割合が最大のブースをBoothInViewportとして判定する.
--- 他の手法案 ---
- ブースの中心と画面の中心の距離が最も近いブースをBoothInViewportとして判定する.
  その距離がブースの対角線の長さより大きい場合undefined.
*/
import type { Booth, Rect } from "./types";

const THRESHOLD_OCCUPANCY = 0.3;

//採用した手法
const getBoothInViewport = (booths: Booth[], viewRect: Rect): Booth | undefined => {
  const viewportOccupancies = booths.map((booth) => {
    if (viewRect.left + viewRect.width < booth.left || booth.left + booth.width < viewRect.left)
      return 0;
    if (viewRect.top + viewRect.height < booth.top || booth.top + booth.height < viewRect.top)
      return 0;
    const w =
      Math.min(viewRect.left + viewRect.width, booth.left + booth.width) -
      Math.max(viewRect.left, booth.left);
    const h =
      Math.min(viewRect.top + viewRect.height, booth.top + booth.height) -
      Math.max(viewRect.top, booth.top);
    return (w * h) / (viewRect.width * viewRect.height);
  });
  const maxOccupancy = Math.max(...viewportOccupancies);
  if (maxOccupancy < THRESHOLD_OCCUPANCY) return;
  return booths[viewportOccupancies.indexOf(maxOccupancy)];
};

const getBoothInViewportByOccupancy = (booths: Booth[], viewRect: Rect): Booth | undefined => {
  const viewportOccupancies = booths.map((booth) => {
    if (viewRect.left + viewRect.width < booth.left || booth.left + booth.width < viewRect.left)
      return 0;
    if (viewRect.top + viewRect.height < booth.top || booth.top + booth.height < viewRect.top)
      return 0;
    const w =
      Math.min(viewRect.left + viewRect.width, booth.left + booth.width) -
      Math.max(viewRect.left, booth.left);
    const h =
      Math.min(viewRect.top + viewRect.height, booth.top + booth.height) -
      Math.max(viewRect.top, booth.top);
    return (w * h) / (viewRect.width * viewRect.height);
  });
  const maxOccupancy = Math.max(...viewportOccupancies);
  if (maxOccupancy < THRESHOLD_OCCUPANCY) return;
  return booths[viewportOccupancies.indexOf(maxOccupancy)];
};
const getBoothInViewportByDistance = (booths: Booth[], viewRect: Rect) => {
  const checkBoothInView = (dist: number) => {
    const viewportDiagonalLength = Math.sqrt(viewRect.width ** 2 + viewRect.height ** 2);
    return dist < viewportDiagonalLength / 2;
  };
  const viewportCenter = {
    x: viewRect.left + viewRect.width / 2,
    y: viewRect.top + viewRect.height / 2,
  };
  const dists = booths.map((booth) => {
    const boothCenter = {
      x: booth.left + booth.width / 2,
      y: booth.top + booth.height / 2,
    };
    return Math.sqrt(
      (boothCenter.x - viewportCenter.x) ** 2 + (boothCenter.y - viewportCenter.y) ** 2,
    );
  });
  const minDist = Math.min(...dists);
  if (!checkBoothInView(minDist)) return;
  return booths[dists.indexOf(minDist)];
};

export default getBoothInViewport;
export { getBoothInViewportByOccupancy, getBoothInViewportByDistance };
