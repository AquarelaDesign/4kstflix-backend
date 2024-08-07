import dotenv from "dotenv/config.js";

const config = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  dbConfig: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  tmdbApiKey: process.env.TMDB_API_KEY,
  tmdbApiAccountId: process.env.TMDB_API_ACCOUNT_ID,
  tmdbApiAccessToken: process.env.TMDB_API_ACCESS_TOKEN,
  language: process.env.LANGUAGE,
  region: process.env.REGION,
  originalLanguage: process.env.ORIGINAL_LANGUAGE,
};

export default config;
