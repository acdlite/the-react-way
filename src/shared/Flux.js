import { Flummox } from 'flummox';
import SlideActions from './actions/SlideActions';
import SlideStore from './stores/SlideStore';

export default class Flux extends Flummox {
  constructor({ slides }) {
    super();

    const slideActions = this.createActions('slides', SlideActions);
    this.createStore('slides', SlideStore, this);

    slideActions.loadSlides(slides);
  }
}
