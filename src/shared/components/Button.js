import React from 'react';

const Button = React.createClass({
  getDefaultProps() {
    return {
      component: 'button',
    };
  },

  render() {
    const { className, component: Component, ...props } = this.props;

    return (
      <Component
        {...props}

        className={['Button', className].filter(Boolean).join(' ')}
      />
    );
  }
});

export default Button;
