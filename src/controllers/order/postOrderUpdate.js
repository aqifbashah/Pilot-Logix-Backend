import pool from "../../database/connection";

async function postOrderUpdate(req, res) {
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

    const currentStatus = checkOrderResult.rows[0].status;

    // update order based on the type
    const updateType = reqBody.updateType;

    if (updateType == "start") {
      // if order is already in progress, return error
      if (currentStatus === "in_progress") {
        return res.status(400).json({
          message: `Order with id = ${orderID} is already in progress`,
        });
      }
      if (currentStatus === "completed") {
        return res.status(400).json({
          message: `Order with id = ${orderID} is already completed`,
        });
      }
      const valuesUpdateOrder = ["in_progress", "now()", orderID];
      const queryUpdateOrder = `
          UPDATE "Orders"
          SET status = $1,
              start_time = $2
          WHERE id = $3;    
      `;
      await pool.query(queryUpdateOrder, valuesUpdateOrder);
      const valuesUpdateTrucks = ["in_use", orderID];
      const queryUpdateTrucks = `
          UPDATE "Trucks" AS t
          SET status = $1
          WHERE EXISTS (
            SELECT 1
            FROM "Assignments" AS a
            WHERE a.truck_id = t.id
              AND a.order_id = $2 
          );
      `;
      await pool.query(queryUpdateTrucks, valuesUpdateTrucks);
      return res
        .status(200)
        .json({ message: `Order with id = ${orderID} is in progress` });
    }

    // if order is already completed, return error
    if (currentStatus === "completed") {
      return res.status(400).json({
        message: `Order with id = ${orderID} is already completed`,
      });
    }
    const values = ["completed", "now()", orderID];
    const queryUpdateOrder = `
        UPDATE "Orders"
        SET status = $1,
            end_time = $2
        WHERE id = $3;    
    `;
    await pool.query(queryUpdateOrder, values);
    return res
      .status(200)
      .json({ message: `Order with id = ${orderID} is completed` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postOrderUpdate:", error);
  }
}

export default postOrderUpdate;
