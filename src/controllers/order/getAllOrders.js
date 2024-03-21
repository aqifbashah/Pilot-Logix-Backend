import pool from "../../database/connection";

async function getAllOrders(req, res) {
  try {
    const query = `
    SELECT * FROM "Orders"
    `;
    const response = await pool.query(query);

    // construct an array to hold the Orders data
    const ordersData = response.rows.map((row) => ({
      id: row.id,
      created_at: row.created_at,
      pickup_loc: row.pickup_loc,
      dropoff_loc: row.dropoff_loc,
      status: row.status,
      trip_rate: row.trip_rate,
      start_time: row.start_time,
      end_time: row.end_time,
    }));

    res.status(200).json(ordersData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in getAllOrders:", error);
  }
}

export default getAllOrders;
