// Create koa app
import koa from 'koa';
const app = koa();

// Add routes
import routes from './routes';
routes(app);

export default app;
