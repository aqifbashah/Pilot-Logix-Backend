import pool from "../../database/connection";

async function getAllDrivers(req, res) {
  try {
    // Get today's date in GMT+8 timezone (UTC + 8 hours)
    const todayDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    // Query to get assignments for each driver and their status
    const query = `
      SELECT
        d.id,
        d.created_at,
        d.first_name,
        d.last_name,
        d.ic_num,
        d.email,
        CASE
          WHEN '${todayDate}' BETWEEN DATE(a1.assignment_date) AND DATE(a1.assignment_date) THEN 'assigned'
          WHEN '${todayDate}' BETWEEN DATE(a2.assignment_date) AND DATE(a2.assignment_date) THEN 'assigned'
          WHEN '${todayDate}' BETWEEN DATE(a3.assignment_date) AND DATE(a3.assignment_date) THEN 'assigned'
          ELSE 'available'
        END AS status
      FROM
        "Drivers" d
      LEFT JOIN
        "Assignments" a1 ON d.id = a1.driver1_id
      LEFT JOIN
        "Assignments" a2 ON d.id = a2.driver2_id
      LEFT JOIN
        "Assignments" a3 ON d.id = a3.driver3_id
    `;

    // Execute the query
    const response = await pool.query(query);

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
