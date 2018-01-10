import { TagInterface } from 'riot';
import router from '../../../config/router';
import { GAME_ROUTE } from '../../../constants/routes';

export interface IndexPage extends TagInterface {
  routeToGamePage(): void;
}

export const init = function (tag: IndexPage): void {
  tag.routeToGamePage = function (): void {
    router.navigate(GAME_ROUTE);
  };
};
