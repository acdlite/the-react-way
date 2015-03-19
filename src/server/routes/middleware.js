import path from 'path';

import bodyParser from 'koa-bodyparser';
import gzip from 'koa-gzip';
import fresh from 'koa-fresh';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import serve from 'koa-static';
import json from 'koa-json';
import qs from 'koa-qs';
import views from 'koa-views';

export default function(app) {
  // Error handling
  app.use(function *(next) {
    try {
      yield next;
    } catch (error) {
      this.status = error.status || 500;
      this.body = error.message;
      this.app.emit('error', error, this);
    }
  });

  // Body parsing
  app.use(bodyParser());

  // gzip compression
  app.use(gzip());

  // Conditional GET
  app.use(conditional());

  // Freshness testing
  app.use(fresh());

  // etags
  app.use(etag());

  // Serve static assets from `public` directory
  app.use(serve('public'));

  // Pretty-print JSON responses
  if (process.env.NODE_ENV === 'development') app.use(json());

  // Add nesting support to query strings
  qs(app);

  // View rendering
  app.use(views(path.join(process.cwd(), 'views'), {
    cache: true,
    default: 'jade',
  }));
}
