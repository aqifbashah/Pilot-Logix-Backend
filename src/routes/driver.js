import express from "express";
import postDriverRegister from "../controllers/authDriver/postDriverRegister";
import postDriverLogin from "../controllers/authDriver/postDriverLogin";
import getAllDrivers from "../controllers/driver/getAllDrivers";
import isAdmin from "../middleware/isAdmin";
import isAuth from "../middleware/isAuth";
import postDriverEdit from "../controllers/driver/postDriverEdit";
import delDriver from "../controllers/driver/delDriver";

const driver = express.Router();

driver.post("/register", postDriverRegister);
driver.post("/login", postDriverLogin);
driver.get("/get-all", isAuth, isAdmin, getAllDrivers);
driver.post("/edit/:driverID", isAuth, postDriverEdit);
driver.delete("/delete/:driverID", isAuth, delDriver);

export default driver;
