import React from 'react';

const View = React.createClass({
  render() {
    const { className, ...props } = this.props;

    return (
      <div
        {...props}
        className={['View', className].filter(Boolean).join(' ')}
      />
    );
  }
});

export default View;
