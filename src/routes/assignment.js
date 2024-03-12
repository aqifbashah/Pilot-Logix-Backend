import express from "express";
import postCreateAssignment from "../controllers/assignment/postCreateAssignment";
import isAuth from "../middleware/isAuth";
import isAdmin from "../middleware/isAdmin";
import getAllAssignments from "../controllers/assignment/getAllAssignments";
import postAssignmentEdit from "../controllers/assignment/postAssignmentEdit";
import delAssignment from "../controllers/assignment/delAssignment";

const assignment = express.Router();

assignment.post("/create", isAuth, isAdmin, postCreateAssignment);
assignment.get("/get-all", isAuth, isAdmin, getAllAssignments);
assignment.post("/edit/:assignmentID", isAuth, isAdmin, postAssignmentEdit);
assignment.delete("/delete/:assignmentID", isAuth, isAdmin, delAssignment);

export default assignment;
