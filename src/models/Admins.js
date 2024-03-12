import pool from "../database/connection";

export async function createAdminsTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS "Admins" (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        position TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_superadmin BOOLEAN DEFAULT FALSE
    );
    `;

  pool
    .query(query)
    .then(() => {
      console.log("Admins table created");
    })
    .catch((err) => {
      console.log(err);
    });
}
