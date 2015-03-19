import Router from 'koa-router';
const router = new Router();

import login from './login';
import appView from './appView';

login(router);
appView(router);

export default router;
