import { useAtom } from "jotai";
import { useEffect } from "react";
import { contentsRectAtom, ratioAtom } from "../atoms";
import type { Rect } from "../types";

const useContentsScaling = () => {
  const [contentsRect, setContentsRect] = useAtom<Rect>(contentsRectAtom);
  const [ratio, setRatio] = useAtom(ratioAtom);
  useEffect(() => {
    const fitWindow = () => {
      const contents = document.getElementById("contents");
      if (!contents) return;
      const ratioW = innerWidth / contents.scrollWidth;
      const ratioH = innerHeight / contents.scrollHeight;
      let ratio = ratioW <= ratioH ? ratioW : ratioH;
      if (ratio >= 1) {
        const translate = `${(innerWidth - contents.scrollWidth) / 2}px, ${
          (innerHeight - contents.scrollHeight) / 2
        }px`;
        contents.style.transform = `translate(${translate})`;
        ratio = 1;
      } else {
        const transformOrigin =
          ratioW <= ratioH
            ? `0 ${(innerHeight - contents.scrollHeight * ratio) / 2}px`
            : `${(innerWidth - contents.scrollWidth * ratio) / 2}px 0`;
        contents.style.transform = `scale(${ratio})`;
        contents.style.transformOrigin = transformOrigin;
      }
      const { left, top, width, height } = contents.getBoundingClientRect();
      setContentsRect({
        left,
        top,
        width,
        height,
      });
      setRatio(ratio);
    };
    fitWindow();
    addEventListener("resize", fitWindow);
    const root = document.getElementById("root");
    if (root) {
      root.style.width = "100vw";
      root.style.height = "100vh";
    }
    return () => removeEventListener("resize", fitWindow);
  }, [setRatio, setContentsRect]);
  return { ratio, contentsRect };
};

export default useContentsScaling;
