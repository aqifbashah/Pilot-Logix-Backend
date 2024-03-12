import express from "express";
import postAdminRegister from "../controllers/authAdmin/postAdminRegister";
import postAdminLogin from "../controllers/authAdmin/postAdminLogin";
import isAuth from "../middleware/isAuth";
import isSuperadmin from "../middleware/isSuperadmin";
import getAllAdmins from "../controllers/admin/getAllAdmins";
import isAdmin from "../middleware/isAdmin";
import delAdmin from "../controllers/admin/delAdmin";
import postAdminEdit from "../controllers/admin/postAdminEdit";

const admin = express.Router();

admin.post("/register", postAdminRegister);
admin.post("/login", postAdminLogin);
admin.get("/get-all", isAuth, isSuperadmin, getAllAdmins);
admin.delete("/delete/:adminID", isAuth, isAdmin, delAdmin);
admin.post("/edit/:adminID", isAuth, isAdmin, postAdminEdit);

export default admin;
