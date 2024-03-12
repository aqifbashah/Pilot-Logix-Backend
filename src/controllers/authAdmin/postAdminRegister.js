import bcrypt from "bcrypt";
import validator from "validator";
import pool from "../../database/connection";

async function postAdminRegister(req, res) {
  try {
    const reqBody = req.body;

    // check if all field is provided
    if (
      !reqBody.first_name ||
      !reqBody.last_name ||
      !reqBody.position ||
      !reqBody.email ||
      !reqBody.password
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // validating email address
    const validatedEmail = validator.isEmail(reqBody.email);

    //  if email not valid, return 400
    if (!validatedEmail) {
      return res
        .status(400)
        .json({ message: "Please enter correct email address" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);

    const values = [
      reqBody.first_name,
      reqBody.last_name,
      reqBody.position,
      reqBody.email,
      hashedPassword,
      reqBody.is_superadmin,
    ];

    const query = `
    INSERT INTO "Admins" (first_name, last_name, position, email, password, is_superadmin)
    VALUES($1, $2, $3, $4, $5, $6)
    `;

    await pool.query(query, values);
    const apiResponse = {
      message: "Admin created successfully",
    };
    res.status(200).json(apiResponse);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postAdminRegister:", error);
  }
}

export default postAdminRegister;
