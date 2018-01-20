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
import { solveBattle, startBattle } from '../dataServices/gameDataService';
import { trainDragon } from '../services/gameService';
import { GameAction } from '../typings/GameTypings';

const playGame = function (
  action$: ActionsObservable<GameAction>,
): Observable<Action> {
  return action$
    .ofType(ACTIONS_TYPES.PLAY_GAME, ACTIONS_TYPES.GAME_SOLVED, ACTIONS_TYPES.STOP_PLAYING)
    .takeWhile(action => action.type !== ACTIONS_TYPES.STOP_PLAYING)
    .delay(2500)
    .switchMap(() =>
      startBattle()
        .flatMap(game => {
          const dragon = trainDragon();

          return solveBattle(game.gameId, dragon)
            .map(response => gameSolved(game, response.response))
            .catch(() => Observable.of(gameFailed()));
        })
        .catch(() => Observable.of(gameFailed()))
        .takeUntil(action$.ofType(ACTIONS_TYPES.STOP_PLAYING)),
    );
};

export default playGame;
