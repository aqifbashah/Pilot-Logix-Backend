import pool from "../../database/connection";

async function getAllDrivers(req, res) {
  try {
    // Get today's date in GMT+8 timezone (UTC + 8 hours)
    const todayDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    // Query to get all drivers
    const driversQuery = `
      SELECT id, created_at, first_name, last_name, ic_num, email
      FROM "Drivers"
    `;

    // Execute the query to get all drivers
    const driversResponse = await pool.query(driversQuery);
    const drivers = driversResponse.rows;

    // Iterate through each driver to check their assignments
    for (let i = 0; i < drivers.length; i++) {
      const driver = drivers[i];

      // Query to check the assignment status for the current driver
      const assignmentQuery = `
        SELECT 
          CASE
            WHEN '${todayDate}' BETWEEN DATE(assignment_date) AND DATE(assignment_date) THEN 'assigned'
            ELSE 'available'
          END AS status
        FROM "Assignments"
        WHERE ${driver.id} IN (driver1_id, driver2_id, driver3_id)
        LIMIT 1
      `;

      // Execute the query to check the assignment status
      const assignmentResponse = await pool.query(assignmentQuery);
      const assignment = assignmentResponse.rows[0];

      // Add the assignment status to the current driver
      driver.status = assignment ? assignment.status : "available";
    }

    // Send the response with all drivers and their assignment status
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in getAllDrivers:", error);
  }
}

export default getAllDrivers;
