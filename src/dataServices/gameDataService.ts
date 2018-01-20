import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { AjaxResponse } from 'rxjs/observable/dom/AjaxObservable';
import { API } from '../constants/gameConstants';
import { Dragon, Game, Weather } from '../typings/GameTypings';

export const startBattle = function (): Observable<Game> {
  return ajax.getJSON(API.GAME);
};

export const solveBattle = function (gameId: number, dragon: Dragon): Observable<AjaxResponse> {
  return ajax.put(
    `${API.GAME}/${gameId}/solution`,
     { dragon },
     { 'Content-Type': 'application/json' },
  );
};

export const getWeather = function (gameId: string): Observable<Weather> {
  return ajax.getJSON(`${API.WEATHER}/${gameId}`);
};
