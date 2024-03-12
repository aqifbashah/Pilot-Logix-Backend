import pool from "../../database/connection";

async function postUploadOrder(req, res) {
  try {
    const reqBody = req.body;
    const orders = reqBody.orders;

    // Extracting values from each order
    const values = orders.map((order) => [
      order.pickup_loc,
      order.dropoff_loc,
      order.trip_rate,
    ]);

    // Constructing the parameterized query
    const query = `
      INSERT INTO "Orders" (pickup_loc, dropoff_loc, trip_rate)
      VALUES ${values
        .map(
          (_, index) =>
            `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`
        )
        .join(", ")}
    `;

    // Flatten the values array
    const flattenedValues = values.flat();

    // Executing the query
    await pool.query(query, flattenedValues);

    const apiResponse = {
      message: `${orders.length} orders uploaded successfully`,
    };
    res.status(200).json(apiResponse);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postUploadOrder:", error);
  }
}

export default postUploadOrder;
