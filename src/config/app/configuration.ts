import {registerAs} from '@nestjs/config';

export default registerAs('app', () => ({
    port: process.env.APP_PORT,
    url: process.env.APP_URL,
    env: process.env.APP_ENVIRONMENT,
    secret: process.env.APP_SECRET
}));
