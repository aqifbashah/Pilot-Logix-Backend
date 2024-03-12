import pool from "../database/connection";

export async function createDriversTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS "Drivers" (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        ic_num NUMERIC(12) UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        salary NUMERIC NOT NULL
    );
    `;

  pool
    .query(query)
    .then(() => {
      console.log("Drivers table created");
    })
    .catch((err) => {
      console.log(err);
    });
}
