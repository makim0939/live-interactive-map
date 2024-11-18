export type Rect = { top: number; left: number; width: number; height: number };
export type ClientCanvas = { id: string; canvas: HTMLCanvasElement };
export type Booth = {
  id: number;
  name: string;
  description: string;
  left: number;
  top: number;
  width: number;
  height: number;
};
export type BoothInsertProps = Omit<Booth, "id">;
export type Favorite = { id: number; booth_id: number };
export type FavoriteInsertProps = Omit<Favorite, "id">;
