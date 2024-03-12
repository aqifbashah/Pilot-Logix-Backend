import pool from "../../database/connection";

async function getAllDrivers(req, res) {
  try {
    const query = `
    SELECT * FROM "Drivers"
    `;
    const response = await pool.query(query);

    // construct an array to hold the Drivers data
    const driversData = response.rows.map((row) => ({
      id: row.id,
      created_at: row.created_at,
      first_name: row.first_name,
      last_name: row.last_name,
      ic_num: row.ic_num,
      email: row.email,
    }));

    res.status(200).json(driversData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in getAllDrivers:", error);
  }
}

export default getAllDrivers;
