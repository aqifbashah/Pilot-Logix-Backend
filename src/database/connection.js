import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin",
  database: "pilot-logix",
  port: "5432",
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
