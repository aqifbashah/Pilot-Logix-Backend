import pool from "../../database/connection";

async function postDriverAssignments(req, res) {
  try {
    const date = req.body.date;
    const driverID = req.user.id;

    // early return if no date inserted
    if (!date) {
      return res.status(401).json({ message: "Please insert date" });
    }

    // Construct the SQL query with a WHERE clause to filter by assignment_date and driver ID
    const query = `
    SELECT
        a.id,
        a.created_at,
        a.assignment_date,
        a.assign_by,
        ad.first_name as admin_first_name,
        ad.last_name as admin_last_name,
        a.driver1_id,
        d1.first_name as d1_first_name,
        d1.last_name as d1_last_name,
        a.driver2_id,
        d2.first_name as d2_first_name,
        d2.last_name as d2_last_name,
        a.driver3_id,
        d3.first_name as d3_first_name,
        d3.last_name as d3_last_name,
        a.order_id,
        o.pickup_loc,
        o.dropoff_loc,
        o.status as order_status,
        a.truck_id,
        t.reg_num,
        t.capacity,
        t.status as truck_status
    FROM 
        "Assignments" a
    LEFT JOIN
        "Drivers" d1 ON a.driver1_id = d1.id
    LEFT JOIN
        "Drivers" d2 ON a.driver2_id = d2.id
    LEFT JOIN
        "Drivers" d3 ON a.driver3_id = d3.id
    LEFT JOIN
        "Orders" o ON a.order_id = o.id
    LEFT JOIN
        "Trucks" t ON a.truck_id = t.id
    LEFT JOIN
        "Admins" ad ON a.assign_by = ad.id
    WHERE 
        a.assignment_date = $1 AND (a.driver1_id = $2 OR a.driver2_id = $2 OR a.driver3_id = $2)`;

    const response = await pool.query(query, [date, driverID]);

    // Construct an array to hold the assignments data
    const assignmentsData = response.rows.map((row) => ({
      id: row.id,
      created_at: row.created_at,
      assignment_date: row.assignment_date,
      assign_by: row.assign_by,
      admin_first_name: row.admin_first_name,
      admin_last_name: row.admin_last_name,
      driver1_id: row.driver1_id,
      d1_first_name: row.d1_first_name,
      d1_last_name: row.d1_last_name,
      driver2_id: row.driver2_id,
      d2_first_name: row.d2_first_name,
      d2_last_name: row.d2_last_name,
      driver3_id: row.driver3_id,
      d3_first_name: row.d3_first_name,
      d3_last_name: row.d3_last_name,
      order_id: row.order_id,
      pickup_loc: row.pickup_loc,
      dropoff_loc: row.dropoff_loc,
      order_status: row.order_status,
      truck_id: row.truck_id,
      truck_reg_num: row.reg_num,
      capacity: row.capacity,
      truck_status: row.truck_status,
    }));

    res.status(200).json(assignmentsData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postDriverAssignments:", error);
  }
}

export default postDriverAssignments;
