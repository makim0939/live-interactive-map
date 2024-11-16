import { atom } from 'jotai';
import { Rect } from './types';

export const ratioAtom = atom<number>(1);
export const contentsRectAtom = atom<Rect>({ left: 0, top: 0, width: 0, height: 0 });
