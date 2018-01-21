import { API } from '../constants/gameConstants';
import { Dragon } from '../typings/GameTypings';
import { ajax } from 'rxjs/observable/dom/ajax';
import { AjaxResponse } from 'rxjs/observable/dom/AjaxObservable';
import { Observable } from 'rxjs/Observable';

export const startBattle = function (): Observable<AjaxResponse> {
  return ajax.get(API.GAME);
};

export const getWeather = function (gameId: number): Observable<AjaxResponse> {
  return ajax({
    method: 'GET',
    url: `${API.WEATHER}/${gameId}`,
    responseType: 'document'
  });
};

export const solveBattle = function (gameId: number, dragon: Dragon): Observable<AjaxResponse> {
  return ajax.put(
    `${API.GAME}/${gameId}/solution`,
     { dragon },
     { 'Content-Type': 'application/json' }
  );
};
