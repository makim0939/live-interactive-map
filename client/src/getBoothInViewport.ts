/*
現在採用している手法
- 画面に占めるブース面積の割合が最大のブースをBoothInViewportとして判定する.
--- 他の手法案 ---
- ブースの中心と画面の中心の距離が最も近いブースをBoothInViewportとして判定する.
  その距離がブースの対角線の長さより大きい場合undefined.
*/
import { BoothInfo, Rect } from './types';

const THRESHOLD_OCCUPANCY = 0.3;

//採用した手法
const getBoothInViewport = (booths: BoothInfo[], viewRect: Rect): BoothInfo | undefined => {
  const viewportOccupancies = booths.map((booth) => {
    if (
      viewRect.left + viewRect.width < booth.area.left ||
      booth.area.left + booth.area.width < viewRect.left
    )
      return 0;
    if (
      viewRect.top + viewRect.height < booth.area.top ||
      booth.area.top + booth.area.height < viewRect.top
    )
      return 0;
    const w =
      Math.min(viewRect.left + viewRect.width, booth.area.left + booth.area.width) -
      Math.max(viewRect.left, booth.area.left);
    const h =
      Math.min(viewRect.top + viewRect.height, booth.area.top + booth.area.height) -
      Math.max(viewRect.top, booth.area.top);
    return (w * h) / (viewRect.width * viewRect.height);
  });
  const maxOccupancy = Math.max(...viewportOccupancies);
  if (maxOccupancy < THRESHOLD_OCCUPANCY) return;
  return booths[viewportOccupancies.indexOf(maxOccupancy)];
};

const getBoothInViewportByOccupancy = (
  booths: BoothInfo[],
  viewRect: Rect,
): BoothInfo | undefined => {
  const viewportOccupancies = booths.map((booth) => {
    if (
      viewRect.left + viewRect.width < booth.area.left ||
      booth.area.left + booth.area.width < viewRect.left
    )
      return 0;
    if (
      viewRect.top + viewRect.height < booth.area.top ||
      booth.area.top + booth.area.height < viewRect.top
    )
      return 0;
    const w =
      Math.min(viewRect.left + viewRect.width, booth.area.left + booth.area.width) -
      Math.max(viewRect.left, booth.area.left);
    const h =
      Math.min(viewRect.top + viewRect.height, booth.area.top + booth.area.height) -
      Math.max(viewRect.top, booth.area.top);
    return (w * h) / (viewRect.width * viewRect.height);
  });
  const maxOccupancy = Math.max(...viewportOccupancies);
  if (maxOccupancy < THRESHOLD_OCCUPANCY) return;
  return booths[viewportOccupancies.indexOf(maxOccupancy)];
};
const getBoothInViewportByDistance = (booths: BoothInfo[], viewRect: Rect) => {
  const checkBoothInView = (dist: number) => {
    const viewportDiagonalLength = Math.sqrt(
      Math.pow(viewRect.width, 2) + Math.pow(viewRect.height, 2),
    );
    return dist < viewportDiagonalLength / 2;
  };
  const viewportCenter = {
    x: viewRect.left + viewRect.width / 2,
    y: viewRect.top + viewRect.height / 2,
  };
  const dists = booths.map((booth) => {
    const boothCenter = {
      x: booth.area.left + booth.area.width / 2,
      y: booth.area.top + booth.area.height / 2,
    };
    return Math.sqrt(
      Math.pow(boothCenter.x - viewportCenter.x, 2) + Math.pow(boothCenter.y - viewportCenter.y, 2),
    );
  });
  const minDist = Math.min(...dists);
  if (!checkBoothInView(minDist)) return;
  return booths[dists.indexOf(minDist)];
};

export default getBoothInViewport;
export { getBoothInViewportByOccupancy, getBoothInViewportByDistance };
