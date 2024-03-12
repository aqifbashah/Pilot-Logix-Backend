import pool from "../../database/connection";

async function postTruckEdit(req, res) {
  try {
    const truckID = Number(req.params.truckID);
    const reqBody = req.body;

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

    // edit/update truck
    const values = [reqBody.new_reg_num, reqBody.new_capacity, truckID];
    const queryEditTruck = `
        UPDATE "Trucks"
        SET reg_num = $1,
            capacity = $2
        WHERE id = $3
    `;
    await pool.query(queryEditTruck, values);
    return res.status(200).json({
      message: `Truck with id = ${truckID} has been updated sucessfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postTruckEdit:", error);
  }
}

export default postTruckEdit;
