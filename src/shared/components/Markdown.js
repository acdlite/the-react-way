import React from 'react';
import Remarkable from 'remarkable';
import hljs from 'highlight.js';

const md = new Remarkable({
  html: true,
  linkify: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
});

const Markdown = React.createClass({
  getDefaultProps() {
    return {
      src: '',
    };
  },

  render() {
    const { src, ...props } = this.props;
    const html = md.render(src);

    return (
      <div
        {...props}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
});

export default Markdown;
