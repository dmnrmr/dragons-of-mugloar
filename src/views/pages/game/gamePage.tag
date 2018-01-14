<dom-game-page class="game-page">
  <h1 class="game-page__title">Now playing Dragons of Mugloar</h1>

  <p class="game-page__status" if="{ state }">{ state.gameStatus }</p>

  <script>
    import { init } from './gamePage';
    import './gamePage.styl';

    init(this);
  </script>
</dom-game-page>
