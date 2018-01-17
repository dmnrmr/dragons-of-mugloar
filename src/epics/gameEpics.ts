import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { gameFailedToStart, gameStarted } from '../actionCreators/gameActionCreator';
import { ACTIONS_TYPES } from '../constants/gameConstants';
import { startBattle } from '../dataServices/gameDataService';
import { GameAction } from '../typings/GameTypings';

const startGame = function (action$: ActionsObservable<GameAction>): Observable<Action> {
  return action$
    .ofType(ACTIONS_TYPES.GAME_START)
    .switchMap(() =>
      startBattle()
        .then(response => response.ok ? response.json() : gameFailedToStart())
        .then(data => data.type === 'REQUEST_FAILED' ? data : gameStarted(data))
        .catch(() => gameFailedToStart()),
    );
};

export default startGame;
