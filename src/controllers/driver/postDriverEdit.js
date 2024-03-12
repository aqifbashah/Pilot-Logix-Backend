import pool from "../../database/connection";

async function postDriverEdit(req, res) {
  try {
    const driverID = Number(req.params.driverID);
    const authData = req.user;
    const reqBody = req.body;

    // check if driver exists
    const queryCheckDriver = `
        SELECT * FROM "Drivers" WHERE id = $1
    `;
    const checkDriverResult = await pool.query(queryCheckDriver, [driverID]);
    if (checkDriverResult.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Driver with id = ${driverID} not found` });
    }

    // check if the driver is the owner or superadmin
    if (authData.id !== driverID && authData.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this user" });
    }

    // edit/update driver
    const values = [
      reqBody.new_first_name,
      reqBody.new_last_name,
      reqBody.new_ic_num,
      reqBody.new_email,
      reqBody.new_salary,
      driverID,
    ];
    const queryEditDriver = `
        UPDATE "Drivers"
        SET first_name = $1,
            last_name = $2,
            ic_num = $3,
            email = $4,
            salary = $5
        WHERE id = $6
    `;
    await pool.query(queryEditDriver, values);
    return res.status(200).json({
      message: `Driver with id = ${driverID} has been updated successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postDriverEdit:", error);
  }
}

export default postDriverEdit;
