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
import { gameFailed, gameSolved, stopPlaying } from '../actionCreators/gameActionCreators';
import { ACTIONS_TYPES } from '../constants/gameConstants';
import { getWeather, solveBattle, source, startBattle } from '../dataServices/gameDataService';
import { getWeatherData, trainDragon } from '../services/gameService';
import { GameAction } from '../typings/GameTypings';

const GAME_CANCEL_MESSAGE = 'gameStoppedByUser';

const isGamePlayable = function (action: GameAction): boolean {
  if (action.type !== ACTIONS_TYPES.STOP_PLAYING) {
    return true;
  }

  source.cancel(GAME_CANCEL_MESSAGE);

  return false;
};

const playGame = function (
  action$: ActionsObservable<GameAction>
): Observable<GameAction> {
  return action$
    .ofType(ACTIONS_TYPES.PLAY_GAME, ACTIONS_TYPES.GAME_SOLVED, ACTIONS_TYPES.STOP_PLAYING)
    .takeWhile(isGamePlayable)
    .delay(500)
    .switchMap(() =>
      startBattle()
        .then(gameResponse => {
          const game = gameResponse.data;

          return getWeather(game.gameId)
            .then(weatherResponse => {
              const weather = getWeatherData(weatherResponse.data);
              const dragon = trainDragon(game.knight, weather);

              return solveBattle(game.gameId, dragon)
                .then(solutionResponse => {
                  return gameSolved(game, solutionResponse.data);
                });
            });
        })
        .catch(error => {
          return error.message === GAME_CANCEL_MESSAGE ? stopPlaying() : gameFailed();
        })
    );
};

export default playGame;
