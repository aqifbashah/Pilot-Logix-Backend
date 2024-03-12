import pool from "../../database/connection";

async function delDriver(req, res) {
  try {
    const driverID = Number(req.params.driverID);
    const authData = req.user;

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

    // delete order
    const queryDeleteDriver = `
        DELETE FROM "Drivers" WHERE id = $1
    `;
    await pool.query(queryDeleteDriver, [driverID]);
    return res.status(200).json({
      message: `Driver with id = ${driverID} has been deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in delDriver:", error);
  }
}

export default delDriver;
