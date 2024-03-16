import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function checkConnection() {
  try {
    const response = await pool.query("SELECT NOW()");
    const time = new Date(response.rows[0].now);
    console.log(`Connected to database at ${time}`);
  } catch (error) {
    console.log("Could not connect to database", error);
  }
}

export default pool;
