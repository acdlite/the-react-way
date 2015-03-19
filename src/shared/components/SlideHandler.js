import React from 'react/addons';
import Flux from 'flummox/component';
import Slide from './Slide';
import View from './View';

const { CSSTransitionGroup } = React.addons;

const SlideHandler = React.createClass({

  statics: {
    willTransitionTo(transition, params, query) {
      const { currentSlide } = params;
      const integerCurrentSlide = parseInt(currentSlide);

      if (`${integerCurrentSlide}` !== currentSlide) {
        return transition.redirect(Number.isNaN(integerCurrentSlide)
          ? '/1'
          : `/${integerCurrentSlide}`
        );
      }
    }
  },

  render() {
    const { slide } = this.props;

    return (
      <CSSTransitionGroup
        transitionName="SlideTransition--fade"
        component={View}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Slide slide={slide} key={slide.slideNumber} />
      </CSSTransitionGroup>
    );
  }
});

export default SlideHandler;
