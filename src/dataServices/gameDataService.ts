import { API } from '../constants/gameConstants';
import { Dragon } from '../typings/GameTypings';

export const startBattle = function (): Promise<Response> {
  return fetch(API.GAME, { method: 'GET' });
};

export const solveBattle = function (gameId: string, data: Dragon): Promise<Response> {
  return fetch(`${API.GAME}/${gameId}/solution`, {
    method: 'PUT',
    body: JSON.stringify(data),
   });
};

export const getWeather = function (gameId: string): Promise<Response> {
  return fetch(`${API.WEATHER}/${gameId}`, { method: 'GET' })
          .then(response => response.json());
};
