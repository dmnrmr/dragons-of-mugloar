import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs/Observable';
import { gameSolved, gameStarted } from '../actionCreators/gameActionCreators';
import { ACTIONS_TYPES } from '../constants/gameConstants';
import { solveBattle, startBattle } from '../dataServices/gameDataService';
import { GameAction } from '../typings/GameTypings';

export const startGame = function (
  action$: ActionsObservable<GameAction>,
): Observable<Action> {
  return action$
    .ofType(ACTIONS_TYPES.PLAY_GAME, ACTIONS_TYPES.GAME_SOLVED, ACTIONS_TYPES.STOP_PLAYING)
    .takeWhile(action => action.type !== ACTIONS_TYPES.STOP_PLAYING)
    .switchMap(() =>
      startBattle()
        .map(game => gameStarted(game))
        .takeUntil(action$.ofType(ACTIONS_TYPES.STOP_PLAYING)),
    );
};

export const solveGame = function (action$: ActionsObservable<GameAction>): Observable<Action> {
  return action$
    .ofType(ACTIONS_TYPES.GAME_STARTED)
    .delay(500)
    .switchMap(({ game }) =>
      solveBattle(game.gameId, game.dragon)
        .map(response => gameSolved(game, response.response))
        .takeUntil(action$.ofType(ACTIONS_TYPES.STOP_PLAYING)),
    );
};
