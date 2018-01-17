<dom-index-page class="index-page">
  <h1 class="index-page__title">Dragons of Mugloar</h1>

  <dom-button button-click-handler="{ routeToGamePage }" button-text="Play" />

  <script>
    import '../../components/button';
    import './indexPage.styl';
    import { init } from './indexPage';

    init(this);
  </script>
</dom-index-page>
