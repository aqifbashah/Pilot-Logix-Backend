import pool from "../../database/connection";

async function postOrderEdit(req, res) {
  try {
    const orderID = req.params.orderID;
    const reqBody = req.body;

    // check if order exists
    const queryCheckOrder = `
              SELECT * FROM "Orders" WHERE id = $1
          `;
    const checkOrderResult = await pool.query(queryCheckOrder, [orderID]);
    if (checkOrderResult.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Order with id = ${orderID} not found` });
    }

    const values = [
      reqBody.new_pickup_loc,
      reqBody.new_dropoff_loc,
      reqBody.new_trip_rate,
      orderID,
    ];

    const queryEditOrder = `
        UPDATE "Orders"
        SET pickup_loc = $1,
            dropoff_loc = $2,
            trip_rate = $3
        WHERE id = $4
    `;
    await pool.query(queryEditOrder, values);
    return res
      .status(200)
      .json({
        message: `Order with id ${orderID} has been updated successfully`,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postOrderEdit:", error);
  }
}

export default postOrderEdit;
