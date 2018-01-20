<dom-game-list>
  <ul class="dom-game-list">
    <li each="{ opts.gameList }" class="dom-game-list__item">{ gameId } / { result.status }</li>
  </ul>

  <script>
    import './gameListComponent.styl';
  </script>
</dom-game-list>
