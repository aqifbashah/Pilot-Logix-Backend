import pool from "../../database/connection";

async function getAllAdmins(req, res) {
  try {
    const query = `
    SELECT * FROM "Admins"
    `;
    const response = await pool.query(query);

    // construct an array to hold the Drivers data
    const adminsData = response.rows.map((row) => ({
      id: row.id,
      created_at: row.created_at,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      is_superadmin: row.is_superadmin,
    }));

    res.status(200).json(adminsData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in getAllAdmins:", error);
  }
}

export default getAllAdmins;
