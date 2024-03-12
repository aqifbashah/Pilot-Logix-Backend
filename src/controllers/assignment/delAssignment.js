import pool from "../../database/connection";

async function delAssignment(req, res) {
  try {
    const assignmentID = Number(req.params.assignmentID);

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

    // delete assignment
    const queryDeleteAssignment = `
        DELETE FROM "Assignments" WHERE id = $1
    `;
    await pool.query(queryDeleteAssignment, [assignmentID]);
    return res.status(200).json({
      message: `Assignment with id = ${assignmentID} has been deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in delAssignment:", error);
  }
}
export default delAssignment;
