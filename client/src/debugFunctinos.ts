import { BoothInfo } from './types';

const addDummyBooths = (booths: BoothInfo[]) => {
  const boothAreas = [
    { left: 1675, top: 500, width: 575, height: 475 },
    { left: 2500, top: 700, width: 575, height: 475 },
    { left: 2000, top: 400, width: 575, height: 800 },
    { left: 2900, top: 800, width: 575, height: 475 },
  ];
  boothAreas.forEach((area, index) => {
    booths.push({
      id: index,
      title: `ブース${index}`,
      area,
      description: `ブース${index}の説明`,
    });
  });
};

export { addDummyBooths };
