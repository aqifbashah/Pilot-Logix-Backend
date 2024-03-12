import pool from "../../database/connection";

async function postAssignmentEdit(req, res) {
  try {
    const assignmentID = req.params.assignmentID;
    const reqBody = req.body;

    // check if assignment exists
    const queryCheckAssignment = `
        SELECT * FROM "Assignments" WHERE id = $1
    `;
    const checkAssignmentResult = await pool.query(queryCheckAssignment, [
      assignmentID,
    ]);
    if (checkAssignmentResult.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Assignment with id = ${assignmentID} not found` });
    }

    const checkValues = [
      reqBody.driver1_id,
      reqBody.driver2_id || null,
      reqBody.driver3_id || null,
      reqBody.order_id,
      reqBody.truck_id,
      reqBody.assignment_date,
    ];

    // Check if assignment already exists for the same order, driver, and truck on the given date
    const checkQuery = `
      SELECT * FROM "Assignments"
      WHERE ($1 IN (driver1_id, driver2_id, driver3_id) 
            OR $2 IN (driver1_id, driver2_id, driver3_id) 
            OR $3 IN (driver1_id, driver2_id, driver3_id) 
            OR order_id = $4 
            OR truck_id = $5)
      AND assignment_date = $6;
    `;

    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length > 0) {
      const existingAssignment = checkResult.rows[0];
      let conflictingPart = "";

      // Define an array of driver IDs to check
      const driverIds = [
        existingAssignment.driver1_id,
        existingAssignment.driver2_id,
        existingAssignment.driver3_id,
      ];

      // Check each driver ID for conflicts
      for (const driverId of driverIds) {
        if (
          driverId === reqBody.driver1_id ||
          driverId === reqBody.driver2_id ||
          driverId === reqBody.driver3_id
        ) {
          conflictingPart = `Driver with id = ${driverId}`;
          break;
        }
      }

      // Check for conflicts with order ID
      if (existingAssignment.order_id === reqBody.order_id) {
        conflictingPart = "Order";
      }

      // Check for conflicts with truck ID
      if (existingAssignment.truck_id === reqBody.truck_id) {
        conflictingPart = "Truck";
      }

      return res.status(400).json({
        message: `${conflictingPart} already assigned for the given date.`,
      });
    }

    const values = [
      reqBody.new_driver1_id,
      reqBody.new_driver2_id || null,
      reqBody.new_driver3_id || null,
      reqBody.new_order_id,
      reqBody.new_truck_id,
      reqBody.new_assignment_date,
      assignmentID,
    ];
    const queryEditAssignment = `
        UPDATE "Assignments"
        SET driver1_id = $1,
            driver2_id = $2,
            driver3_id = $3,
            order_id = $4,
            truck_id = $5,
            assignment_date = $6
        WHERE id = $7
    `;
    await pool.query(queryEditAssignment, values);
    return res.status(200).json({
      message: `Assignment with id = ${assignmentID} has been updated successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postAssignmentEdit:", error);
  }
}

export default postAssignmentEdit;
