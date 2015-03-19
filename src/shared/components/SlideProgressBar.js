import React from 'react';
import { Navigation, Link } from 'react-router';
import View from './View';
import Button from './Button';

const style = {
  bar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  button: {
    padding: '0.75em',
    fontSize: '1.5em',
    position: 'relative',
    top: '0.125em',
  },

  wrapper: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
};

const SlideProgressBar = React.createClass({
  mixins: [Navigation],

  componentDidMount() {
    const key = require('keymaster');
    key('space', this.nextSlide);
    key('right', this.nextSlide);
    key('left', this.prevSlide);
  },

  componentWillUnmount() {
    const key = require('keymaster');
    key.unbind('space');
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
      <View className="SlideProgressBar" style={style.bar}>
        <View className="SlideProgressBar-wrapper" style={style.wrapper}>
          <Button component={Link} to={`/${this.getPrevSlide()}`} style={style.button}>&#x25c0;</Button>
          <View style={{ alignSelf: 'center' }}>
            {currentSlide}&nbsp;/&nbsp;{totalSlides}
          </View>
          <Button component={Link} to={`/${this.getNextSlide()}`} style={style.button}>&#x25ba;</Button>
        </View>
      </View>
    );
  }
});

export default SlideProgressBar;
