import pool from "../../database/connection";

async function delTruck(req, res) {
  try {
    const truckID = Number(req.params.truckID);

    // check if truck exists
    const queryCheckTruck = `
        SELECT * FROM "Trucks" WHERE id = $1
    `;
    const checkTruckResult = await pool.query(queryCheckTruck, [truckID]);
    if (checkTruckResult.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Truck with id = ${truckID} not found` });
    }

    // delete truck
    const queryDeleteTruck = `
        DELETE FROM "Trucks" WHERE id = $1
    `;
    await pool.query(queryDeleteTruck, [truckID]);
    return res.status(200).json({
      message: `Truck with id = ${truckID} has been deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in delTruck:", error);
  }
}

export default delTruck;
