import pool from "../database/connection";

export async function createOrderStatusType() {
  const query = `
        DO $$ BEGIN
        CREATE TYPE orderStatusType AS ENUM ('pending', 'in_progress', 'completed');
        EXCEPTION
        WHEN duplicate_object THEN null;
        END $$;`;

  pool
    .query(query)
    .then(() => {
      console.log("OrderStatus type created");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function createOrdersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS "Orders" (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        pickup_loc TEXT NOT NULL,
        dropoff_loc TEXT NOT NULL,
        status orderStatusType DEFAULT 'pending',
        trip_rate NUMERIC NOT NULL,
        start_time TIME,
        end_time TIME
    );
    `;

  pool
    .query(query)
    .then(() => {
      console.log("Orders table created");
    })
    .catch((err) => {
      console.log(err);
    });
}
