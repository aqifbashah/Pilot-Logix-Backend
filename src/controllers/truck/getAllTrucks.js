import pool from "../../database/connection";

async function getAllTrucks(req, res) {
  try {
    const query = `
    SELECT * FROM "Trucks"
    `;
    const response = await pool.query(query);

    // construct an array to hold the Trucks data
    const trucksData = response.rows.map((row) => ({
      id: row.id,
      created_at: row.created_at,
      reg_num: row.reg_num,
      capacity: row.capacity,
      status: row.status,
    }));

    res.status(200).json(trucksData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in getAllTrucks:", error);
  }
}

export default getAllTrucks;
