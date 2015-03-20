The React Way
=============

An isomorphic React slide deck, about React.

Presented at [Frontend Awesome Meetup](http://www.meetup.com/Gainesville-Front-End-Dev-Meetup/)
March 19, 2015

Running the slide deck
----------------------

Run `npm start` to start the server. Then navigate to http://localhost:3000. (You could use wget to convert this to a static site.)

Run `make watch` instead to start the server in development mode, with hot reloading.

How it's made
-------------

The slides are generated from Markdown documents located in `slides`. A build task combines the slides into a JSON document, which is embedded into the page by the server to be loaded by the React app.

- [React](http://facebook.github.io/react/)
- [Flummox](https://github.com/acdlite/flummox)
  - Overkill in this case, but used for illustration purposes.
- [React Router](https://github.com/rackt/react-router)
- [React Hot Loader](http://gaearon.github.io/react-hot-loader/)
- [Remarkable](https://github.com/jonschlinkert/remarkable)
- [front-matter](https://github.com/jxson/front-matter)
- [Sass/Libsass](http://sass-lang.com/)
- [Make](http://www.gnu.org/software/make/manual/make.html)
- [Babel](https://babeljs.io/)
- [iojs](https://iojs.org)
- [koa](http://koajs.com/)

...and more.
