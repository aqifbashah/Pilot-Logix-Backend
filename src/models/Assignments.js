import pool from "../database/connection";

export async function createAssignmentsTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS "Assignments" (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        driver1_id INTEGER REFERENCES "Drivers"(id) NOT NULL,
        driver2_id INTEGER REFERENCES "Drivers"(id),
        driver3_id INTEGER REFERENCES "Drivers"(id),
        order_id INTEGER REFERENCES "Orders"(id) NOT NULL,
        truck_id INTEGER REFERENCES "Trucks"(id) NOT NULL,
        assignment_date DATE NOT NULL,
        assign_by INTEGER REFERENCES "Admins"(id) NOT NULL
    );
    `;

  await pool
    .query(query)
    .then(() => {
      console.log("Assignments table created");
    })
    .catch((err) => {
      console.log(err);
    });
}
