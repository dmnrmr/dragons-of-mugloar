import { DragonStat, WeatherCode } from '../constants/gameConstants';
import { Dragon, Knight, Weather } from '../typings/GameTypings';
import { findAttributeWithMaxValue } from './utils';

const trainDragonForNormalWeather = function (dragon: Dragon): Dragon {
  const WINNING_STAT_FACTOR = 2;
  const availableStats = Array.from(new Array(WINNING_STAT_FACTOR), () => 1);
  const epicStat = findAttributeWithMaxValue(dragon);

  const champion = {
    ...dragon,
    [epicStat]: dragon[epicStat] + WINNING_STAT_FACTOR
  };

  Object.keys(champion)
    .forEach(stat => {
      const isEpicStat = stat === epicStat;
      const isStatQuotaDepleted = availableStats.length < 1;
      const isStatZero = champion[stat] === 0;

      if (isEpicStat || isStatQuotaDepleted || isStatZero) {
        return;
      }

      return champion[stat] = champion[stat] - availableStats.pop();
    });

  return champion;
};

const trainDragonStatsBasedOnWeather = function (dragon: Dragon, weather: Weather): Dragon {
  if (weather.code === WeatherCode.Normal) {
    return trainDragonForNormalWeather(dragon);
  }

  if (weather.code === WeatherCode.Storm) {
    return {
      [DragonStat.Scale]: 5,
      [DragonStat.Claws]: 10,
      [DragonStat.Wings]: 5,
      [DragonStat.Fire]: 0
    };
  }

  if (weather.code === WeatherCode.Dry) {
    return {
      [DragonStat.Scale]: 5,
      [DragonStat.Claws]: 5,
      [DragonStat.Wings]: 5,
      [DragonStat.Fire]: 5
    };
  }

  return dragon;
};

export const trainDragon = function (knight: Knight, weather: Weather): Dragon {
  const {
    attack: scaleThickness,
    armor: clawSharpness,
    agility: wingStrength,
    endurance: fireBreath
  } = knight;
  const dragon = {
    [DragonStat.Scale]: scaleThickness,
    [DragonStat.Claws]: clawSharpness,
    [DragonStat.Wings]: wingStrength,
    [DragonStat.Fire]: fireBreath
  };

  return trainDragonStatsBasedOnWeather(dragon, weather);
};

export const getWeatherData = function (weather: Document): Weather {
  const code = weather.getElementsByTagName('code')[0].textContent as WeatherCode;

  return {
    code
  };
};
