import React from 'react';
import View from './View';
import Button from './Button';

const PLLogo = React.createClass({
  render() {
    return (
      <View style={{
        position: 'absolute',
        width: '100%',
      }}>
        <Button component="a" href="https://parisleaf.com">
          <img src="/img/pl-logo.svg" style={{
            height: '2em',
            padding: '1em',
          }}/>
        </Button>
      </View>
    );
  }
});

export default PLLogo;
