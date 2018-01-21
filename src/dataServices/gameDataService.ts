import axios, { AxiosPromise } from 'axios';
import { API } from '../constants/gameConstants';
import { Dragon, Game } from '../typings/GameTypings';

const CancelToken = axios.CancelToken;

export const source = CancelToken.source();

export const startBattle = function (): AxiosPromise<Game> {
  return axios({
    method: 'get',
    url: API.GAME,
    responseType: 'json',
    cancelToken: source.token
  });
};

export const solveBattle = function (gameId: number, dragon: Dragon): AxiosPromise<any> {
  return axios({
    method: 'put',
    url: `${API.GAME}/${gameId}/solution`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: dragon,
    responseType: 'json',
    cancelToken: source.token
  });
};
