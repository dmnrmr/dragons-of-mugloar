<dom-game-page class="game-page">
  <h1 class="game-page__title">Now playing Dragons of Mugloar</h1>

  <span class="game-page__status">{ state.playStatus }</span>

  <dom-button class="game-page__action-button" button-click-handler="{ stopPlaying }" button-text="Stop" />

  <dom-game-list if="{ state.games.length > 0 }" game-list="{ state.games }" />

  <script>
    import { init } from './gamePage';
    import './gamePage.styl';
    import '../../components/gameList';
    import '../../components/button';

    init(this);
  </script>
</dom-game-page>
