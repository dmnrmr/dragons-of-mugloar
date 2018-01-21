import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs/Observable';
import { gameFailed, gameSolved } from '../actionCreators/gameActionCreators';
import { ACTIONS_TYPES } from '../constants/gameConstants';
import { solveBattle, source, startBattle } from '../dataServices/gameDataService';
import { trainDragon } from '../services/gameService';
import { GameAction } from '../typings/GameTypings';

const isGamePlayable = function (action: GameAction): boolean {
  if (action.type !== ACTIONS_TYPES.STOP_PLAYING) {
    return true;
  }

  source.cancel();

  return false;
};

const playGame = function (
  action$: ActionsObservable<GameAction>
): Observable<GameAction> {
  return action$
    .ofType(ACTIONS_TYPES.PLAY_GAME, ACTIONS_TYPES.GAME_SOLVED, ACTIONS_TYPES.STOP_PLAYING)
    .takeWhile(isGamePlayable)
    .delay(2500)
    .switchMap(() =>
      startBattle()
        .then(gameResponse => {
          const dragon = trainDragon();

          return solveBattle(gameResponse.data.gameId, dragon)
            .then(solutionResponse => {
              return gameSolved(gameResponse.data, solutionResponse.data);
            });
        })
        .catch(() => gameFailed())
    );
};

export default playGame;
