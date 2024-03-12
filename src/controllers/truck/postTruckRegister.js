import pool from "../../database/connection";

async function postTruckRegister(req, res) {
  try {
    const reqBody = req.body;

    const values = [reqBody.truck_reg_num, reqBody.capacity, reqBody.status];
    const query = `
        INSERT INTO "Trucks" (reg_num, capacity, status)
        VALUES ($1, $2, $3);
    `;

    await pool.query(query, values);
    const apiResponse = {
      message: "Truck created successfully",
    };
    res.status(200).json(apiResponse);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postTruckRegister:", error);
  }
}

export default postTruckRegister;
