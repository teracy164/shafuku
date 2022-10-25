export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'secret',
  expire: process.env.JWT_EXPIRE || '1800s',
};

export const JWT_COOKIE_KEY = 'token';
