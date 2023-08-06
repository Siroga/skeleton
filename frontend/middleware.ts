import { chain } from './app/middlewares/chain';
import { withAuthMiddleware } from './app/middlewares/authMiddleware';

export default chain([withAuthMiddleware]);

export const config = {
  matcher: ['/((?!static|.*\\..*|_next|svg).*)'],
};
