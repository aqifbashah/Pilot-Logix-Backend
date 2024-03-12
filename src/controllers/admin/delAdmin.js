import pool from "../../database/connection";

async function delAdmin(req, res) {
  try {
    const adminID = Number(req.params.adminID);
    const authData = req.user;

    // check if admin exists
    const queryCheckAdmin = `
        SELECT * FROM "Admins" WHERE id = $1
    `;
    const checkAdminResult = await pool.query(queryCheckAdmin, [adminID]);
    if (checkAdminResult.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Order with id = ${adminID} not found` });
    }

    // Check if the admin is owner or superadmin
    if (authData.id !== adminID && authData.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this user" });
    }

    // delete admin
    const queryDeleteAdmin = `
        DELETE FROM "Admins" WHERE id = $1
    `;
    await pool.query(queryDeleteAdmin, [adminID]);
    return res.status(200).json({
      message: `Admin with id = ${adminID} has been deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in delAdmin:", error);
  }
}

export default delAdmin;
