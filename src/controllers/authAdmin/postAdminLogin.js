import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../../database/connection";

async function postAdminLogin(req, res) {
  try {
    const reqBody = req.body;

    // check if email exists in database
    const query = `
    SELECT * FROM "Admins" WHERE email = $1;
    `;
    const value = [reqBody.email];
    const response = await pool.query(query, value);

    // if email not found, return 404
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    // if email found, check if password matches
    // check the match by using bcrypt.compare()
    const isPasswordCorrect = await bcrypt.compare(
      reqBody.password,
      response.rows[0].password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    // Determine the role based on is_superadmin
    const role = response.rows[0].is_superadmin ? "superadmin" : "admin";

    // if password matches, create token using jwt
    const adminData = {
      id: response.rows[0].id,
      email: response.rows[0].email,
      first_name: response.rows[0].first_name,
      last_name: response.rows[0].last_name,
      position: response.rows[0].position,
      is_superadmin: response.rows[0].is_superadmin,
      role: role,
    };
    const token = jwt.sign(adminData, "pilotLogixSecured");

    // if password matches, return user object
    const apiResponse = {
      message: "Login successful",
      user: adminData,
      token: token,
    };
    res.status(200).json(apiResponse);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postDriverLogin:", error);
  }
}

export default postAdminLogin;
