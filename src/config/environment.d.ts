interface AppEnv {
  NODE_ENV: 'development' | 'production';
  HOST?: string;
  PORT?: string;
  NAME?: string;
  DATABASE_URL: string;
  MAIL_HOST: string;
  MAIL_PORT: string;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  ENCRYPTION_SECRET: string;
  REDIRECT_RECOVER_PASSWORD: string;
  REDIRECT_VERIFY_EMAIL: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends AppEnv {}
}
