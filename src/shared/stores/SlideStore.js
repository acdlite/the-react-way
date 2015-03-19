import { Store } from 'flummox';

export default class SlideStore extends Store {
  constructor(flux) {
    super();

    const actions = flux.getActions('slides');
    this.register(actions.loadSlides, this.handleLoadSlides);

    this.state = {
      slides: [],
    }
  }

  handleLoadSlides(newSlides) {
    this.setState({
      slides: newSlides,
    });
  }
}
