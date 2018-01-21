<dom-game-page class="game-page">
  <div class="game-page__header">
    <h1 class="game-page__title">
      Dragons of Mugloar:
      <span class="game-page__status">{ state.playStatus }</span>
    </h1>

    <dom-button class="game-page__action-button" button-click-handler="{ stopPlaying }" button-text="Stop" />
  </div>

  <div class="game-page__content">
    <div class="game-page__column game-page__column--left">
      <dom-game-list if="{ state.games.length > 0 }" game-list="{ state.games }" />
    </div>

    <div class="game-page__column game-page__column--right">
      <h2 class="game-page__sub-title">Winrate:</h2>

      <p class="game-page__value">{ winrate || 0 }%</p>
    </div>
  </div>

  <script>
    import { init } from './gamePage';
    import './gamePage.styl';
    import '../../components/gameList';
    import '../../components/button';

    init(this);
  </script>
</dom-game-page>
