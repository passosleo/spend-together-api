import 'dotenv/config';
import { name } from '../../package.json';

// @ts-ignore
function requiredEnv(env: keyof AppEnv) {
  const value = process.env[String(env)];
  if (!value) {
    console.error(`Required environment variable "${String(env)}" is missing.`);
    process.exit(1);
  }
  return value;
}

function getBaseUrl() {
  if (baseConfig.host.startsWith('http://localhost')) {
    return `${baseConfig.host}:${baseConfig.port}`;
  } else {
    return baseConfig.host;
  }
}

const baseConfig = {
  name: process.env.NAME || name,
  host: process.env.NODE_ENV === 'production' ? requiredEnv('HOST') : process.env.HOST || 'http://localhost',
  port: Number(process.env.PORT) || 3000,
  environment: process.env.NODE_ENV || 'development',
};

export const config = {
  app: {
    ...baseConfig,
    baseUrl: getBaseUrl(),
  },
  db: {
    url: requiredEnv('DATABASE_URL'),
  },
  mail: {
    host: requiredEnv('MAIL_HOST'),
    port: requiredEnv('MAIL_PORT'),
    user: requiredEnv('MAIL_USER'),
    password: requiredEnv('MAIL_PASSWORD'),
  },
  jwt: {
    secret: requiredEnv('JWT_SECRET'),
    expiresIn: requiredEnv('JWT_EXPIRES_IN'),
  },
  encryption: {
    secret: requiredEnv('ENCRYPTION_SECRET'),
  },
  redirects: {
    recoverPassword: requiredEnv('REDIRECT_RECOVER_PASSWORD'),
    verifyEmail: requiredEnv('REDIRECT_VERIFY_EMAIL'),
  },
};
