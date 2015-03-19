import fs from 'fs';
import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';
import routes from '../../../shared/routes';
import Flux from '../../../shared/Flux';

const slidesString = fs.readFileSync('public/slides.json', 'utf8');
const slides = JSON.parse(slidesString);

export default async ({ initialPath }) => {

  const router = Router.create({
    routes: routes,
    location: initialPath,
    onError: error => {
      throw error;
    },
    onAbort: abortReason => {
      const error = new Error();

      if (abortReason.constructor.name === 'Redirect') {
        const { to, params, query } = abortReason;
        const url = router.makePath(to, params, query);
        error.redirect = url;
      }

      throw error;
    }
  });

  const flux = new Flux({ slides });

  const { Handler, state } = await new Promise((resolve, reject) => {
    router.run((_Handler, _state) =>
      resolve({ Handler: _Handler, state: _state })
    );
  });

  const appString = React.renderToString(
    <FluxComponent flux={flux}>
      <Handler {...state} />
    </FluxComponent>
  );

  return {
    appString,
    slidesString,
  };
}
