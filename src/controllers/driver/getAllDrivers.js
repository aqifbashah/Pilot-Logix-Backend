import pool from "../../database/connection";

async function getAllDrivers(req, res) {
  try {
    // Get today's date in YYYY-MM-DD format
    const todayDate = new Date().toISOString().split("T")[0];

    // Query to get all drivers and their assignments for today
    const query = `
      SELECT d.id, d.created_at, d.first_name, d.last_name, d.ic_num, d.email, 
      CASE WHEN COUNT(a.id) > 0 THEN 'assigned' ELSE 'available' END AS status
      FROM "Drivers" d
      LEFT JOIN "Assignments" a ON d.id = a.driver_id AND DATE(a.assignment_date) = $1
      GROUP BY d.id
    `;

    const response = await pool.query(query, [todayDate]);

    // Construct an array to hold the Drivers data with their status
    const driversData = response.rows.map((row) => ({
      id: row.id,
      created_at: row.created_at,
      first_name: row.first_name,
      last_name: row.last_name,
      ic_num: row.ic_num,
      email: row.email,
      status: row.status, // Add the 'status' field to the response
    }));

    res.status(200).json(driversData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in getAllDrivers:", error);
  }
}

export default getAllDrivers;
