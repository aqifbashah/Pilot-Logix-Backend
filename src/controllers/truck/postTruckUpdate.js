import pool from "../../database/connection";

async function postTruckUpdate(req, res) {
  try {
    const truckID = req.params.truckID;
    const reqBody = req.body;

    // check if Truck exists
    const queryCheckTruck = `
        SELECT * FROM "Trucks" WHERE id = $1
    `;
    const checkTruck = await pool.query(queryCheckTruck, [truckID]);
    if (checkTruck.rowCount === 0) {
      return res(404).json({
        message: `Truck with id = ${truckID} not found`,
      });
    }

    // update truck
    const values = [reqBody.newStatus, truckID];
    const queryUpdateTruck = `
        UPDATE "Trucks" SET status = $1 WHERE id = $2
    `;
    await pool.query(queryUpdateTruck, values);
    return res.status(200).json({
      message: `Truck status with id = ${truckID} has been updated to ${reqBody.newStatus}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postTruckUpdate:", error);
  }
}

export default postTruckUpdate;
