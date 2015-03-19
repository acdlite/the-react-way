import React from 'react';
import { Navigation, Link } from 'react-router';
import View from './View';
import Button from './Button';

const style = {
  button: {
    padding: '0.75em',
    fontSize: '1.5em',
    position: 'relative',
    top: '0.125em',
  }
};

const SlideProgressBar = React.createClass({
  mixins: [Navigation],

  componentDidMount() {
    const key = require('keymaster');
    key('right', this.nextSlide);
    key('left', this.prevSlide);
  },

  componentWillUnmount() {
    const key = require('keymaster');
    key.unbind('right');
    key.unbind('left');
  },

  getNextSlide() {
    const { currentSlide, totalSlides } = this.getSlidePositions();

    return (currentSlide >= totalSlides) ? 1 : currentSlide + 1;
  },

  getPrevSlide() {
    const { currentSlide, totalSlides } = this.getSlidePositions();

    return (currentSlide <= 1) ? totalSlides : currentSlide - 1;
  },

  nextSlide(event) {
    event.preventDefault();

    this.goToSlide(this.getNextSlide());
  },

  prevSlide(event) {
    event.preventDefault();

    this.goToSlide(this.getPrevSlide());
  },

  goToSlide(slideNumber) {
    this.transitionTo(`/${slideNumber}`);
  },

  getSlidePositions() {
    const currentSlide = parseInt(this.props.currentSlide);
    const totalSlides = parseInt(this.props.totalSlides);

    return { currentSlide, totalSlides };
  },

  render() {
    const { currentSlide, totalSlides } = this.getSlidePositions();

    return (
      <View style={{
        justifyContent: 'space-between',
      }}>
        <Button component={Link} to={`/${this.getPrevSlide()}`} style={style.button}>&#x25c0;</Button>
        <span style={{ alignSelf: 'center' }}>
          {currentSlide} / {totalSlides}
        </span>
        <Button component={Link} to={`/${this.getNextSlide()}`} style={style.button}>&#x25ba;</Button>
      </View>
    );
  }
});

export default SlideProgressBar;
