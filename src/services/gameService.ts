import { Dragon } from '../typings/GameTypings';

export const trainDragon = function (): Dragon {
  return {
    scaleThickness: 10,
    clawSharpness: 5,
    wingStrength: 4,
    fireBreath: 1,
  };
};
