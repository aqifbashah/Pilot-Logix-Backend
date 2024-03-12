import pool from "../../database/connection";

async function postAdminEdit(req, res) {
  try {
    const adminID = Number(req.params.adminID);
    const authData = req.user;
    const reqBody = req.body;

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
        .json({ message: "You are not authorized to edit this user" });
    }

    // edit/update admin
    const values = [
      reqBody.new_first_name,
      reqBody.new_last_name,
      reqBody.new_position,
      reqBody.new_email,
      reqBody.is_superadmin,
      adminID,
    ];
    const queryEditAdmin = `
        UPDATE "Admins"
        SET first_name = $1,
            last_name = $2,
            position = $3,
            email = $4,
            is_superadmin = $5
        WHERE id = $6
    `;
    await pool.query(queryEditAdmin, values);
    return res.status(200).json({
      message: `Admin with id = ${adminID} has been updated successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in delAdmin:", error);
  }
}

export default postAdminEdit;
