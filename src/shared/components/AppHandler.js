import React from 'react';
import Flux from 'flummox/component';
import { RouteHandler } from 'react-router';
import SlideProgressBar from './SlideProgressBar';
import PLLogo from './PLLogo';
import View from './View';

const AppHandler = React.createClass({
  render() {
    return (
      <View style={{
        position: 'fixed',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
      }}>
        <PLLogo />
        <Flux connectToStores={{
          slides: store => ({
            slide: store.state.slides[this.props.params.currentSlide - 1],
          })
        }}>
          <RouteHandler {...this.props} />
        </Flux>

        <Flux connectToStores={{
          slides: store => ({
            totalSlides: store.state.slides.length,
          })
        }}>
          <SlideProgressBar currentSlide={this.props.params.currentSlide} />
        </Flux>
      </View>
    );
  }
});

export default AppHandler;
