import React from 'react';
import View from './View';

const PLLogo = React.createClass({
  render() {
    return (
      <View style={{
        position: 'absolute',
        width: '100%',
      }}>
        <img src="/img/pl-logo.svg" style={{
          height: '2em',
          padding: '1em',
        }}/>
      </View>
    );
  }
});

export default PLLogo;
