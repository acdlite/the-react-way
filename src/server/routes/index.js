import middleware from './middleware';
import router from 'koa-router';
import renderAppToString from './utils/renderAppToString';

export default function(app) {
  middleware(app);

  app.use(router(app));

  app.get(/.*/, function *() {
    let appString, slidesString;

    try {
      const result = yield renderAppToString({
        initialPath: this.url,
      });

      appString = result.appString;
      slidesString = result.slidesString;
    } catch (error) {
      if (error.redirect) {
        return this.redirect(error.redirect);
      }

      throw error;
    }

    yield this.render('app', {
      appString,
      slidesString,
      env: process.env,
    });
  });
}
