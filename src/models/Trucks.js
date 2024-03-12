import pool from "../database/connection";

export async function createTruckStatusType() {
  const query = `
        DO $$ BEGIN
        CREATE TYPE truckStatusType AS ENUM ('available', 'in_use', 'maintenance');
        EXCEPTION
        WHEN duplicate_object THEN null;
        END $$;`;

  pool
    .query(query)
    .then(() => {
      console.log("TruckStatus type created");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function createTrucksTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS "Trucks" (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reg_num TEXT UNIQUE NOT NULL,
        capacity NUMERIC NOT NULL,
        status truckStatusType DEFAULT 'available'
    );
    `;

  pool
    .query(query)
    .then(() => {
      console.log("Trucks table created");
    })
    .catch((err) => {
      console.log(err);
    });
}
