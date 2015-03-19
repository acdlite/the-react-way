import React from 'react';
import View from './View';
import Markdown from './Markdown';

const Slide = React.createClass({
  render() {
    const { slide } = this.props;

    if (!slide) return null;

    const { slideNumber, body, ...props } = slide;

    return (
      <View
        className="Slide"
        style={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: props.centered ? 'center' : 'left',
        }}
      >
        <Markdown src={body} style={{
          width: '80%',
        }}/>
      </View>
    );
  }
});

export default Slide;
