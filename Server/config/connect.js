import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool = {};
if (process.env.NODE_ENV === 'development'){
  pool = new Pool({
    connectionString: process.env.DEV_URL,
  });
}

if (process.env.NODE_ENV === 'testing') {
  pool = new Pool({
    connectionString: process.env.TEST_URL,
  });
}
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.PRODUCTION_URL,
  });
}
export default pool;
