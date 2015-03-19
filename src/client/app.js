require('../shared/init');

import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';
import Flux from '../shared/Flux';
import routes from '../shared/routes';

const slides = JSON.parse(
  document.getElementById('slides-data').innerText
);

// Initialize flux
const flux = new Flux({ slides });

// Render app
Router.run(routes, Router.HistoryLocation, async (Handler, state) => {
  React.render(
    <FluxComponent flux={flux}>
      <Handler {...state} />
    </FluxComponent>,
    document.getElementById('app')
  );
});
