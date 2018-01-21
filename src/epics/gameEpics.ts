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
import { getWeather, solveBattle, startBattle } from '../dataServices/gameDataService';
import { getWeatherData, trainDragon } from '../services/gameService';
import { GameAction } from '../typings/GameTypings';

const isGamePlayable = function (action: GameAction): boolean {
  return action.type !== ACTIONS_TYPES.STOP_PLAYING;
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
        .flatMap(gameResponse => getWeather(gameResponse.response.gameId)
          .flatMap(weatherResponse => {
            const weather = getWeatherData(weatherResponse.response);
            const dragon = trainDragon(gameResponse.response.knight, weather);

            return solveBattle(gameResponse.response.gameId, dragon)
              .map(response => gameSolved(gameResponse.response, response.response));
          })
        )
        .catch(() => Observable.of(gameFailed()))
    )
    .takeUntil(action$.ofType(ACTIONS_TYPES.STOP_PLAYING));
};

export default playGame;
