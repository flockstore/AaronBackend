import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    expiration: process.env.AUTH_EXPIRATION,
    secret: process.env.AUTH_SECRET
}));
