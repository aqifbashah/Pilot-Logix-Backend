import pool from "../../database/connection";

async function delOrder(req, res) {
  try {
    const orderID = req.params.orderID;

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

    // delete order
    const queryDeleteOrder = `
        DELETE FROM "Orders" WHERE id = $1
    `;
    await pool.query(queryDeleteOrder, [orderID]);
    return res.status(200).json({
      message: `Order with id = ${orderID} has been deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in delOrder:", error);
  }
}

export default delOrder;
