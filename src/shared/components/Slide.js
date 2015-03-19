import React from 'react';
import View from './View';
import Markdown from './Markdown';

const style = {
  slide: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: '3em',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
};

const Slide = React.createClass({
  render() {
    const { slide } = this.props;

    if (!slide) return null;

    const {
      slideNumber,
      body,
      verticalAlign,
      centered,
      image,
      ...props } = slide;

    let alignItems;
    switch (verticalAlign) {
      case 'bottom':
        alignItems = 'flex-end';
        break;
      case 'top':
        alignItems = 'flex-start';
        break;
      default:
        alignItems = 'center';
    }

    const slideStyle = {
      textAlign: centered ? 'center' : 'left',
      alignItems
    };

    if (image) slideStyle.backgroundImage = `url(${image})`;

    return (
      <View
        className="Slide"
        style={{...style.slide, ...slideStyle}}
      >
        <Markdown src={body} style={{
          width: '80%',
        }}/>
      </View>
    );
  }
});

export default Slide;
