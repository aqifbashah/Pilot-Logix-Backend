import bcrypt from "bcrypt";
import validator from "validator";
import pool from "../../database/connection";

async function postDriverRegister(req, res) {
  try {
    const reqBody = req.body;

    // check if all field is provided
    if (
      !reqBody.first_name ||
      !reqBody.last_name ||
      !reqBody.email ||
      !reqBody.password ||
      !reqBody.ic_num ||
      !reqBody.salary
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
      reqBody.email,
      hashedPassword,
      reqBody.ic_num,
      reqBody.salary,
    ];

    const query = `
    INSERT INTO "Drivers" (first_name, last_name, email, password, ic_num, salary)
    VALUES($1, $2, $3, $4, $5, $6)
    `;

    await pool.query(query, values);
    const apiResponse = {
      message: "Driver created successfully",
    };
    res.status(200).json(apiResponse);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postDriverRegister:", error);
  }
}

export default postDriverRegister;
