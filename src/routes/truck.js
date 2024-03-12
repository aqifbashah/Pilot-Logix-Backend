import express from "express";
import postTruckRegister from "../controllers/truck/postTruckRegister";
import isAuth from "../middleware/isAuth";
import isAdmin from "../middleware/isAdmin";
import getAllTrucks from "../controllers/truck/getAllTrucks";
import postTruckUpdate from "../controllers/truck/postTruckUpdate";
import postTruckEdit from "../controllers/truck/postTruckEdit";
import delTruck from "../controllers/truck/delTruck";

const truck = express.Router();

truck.post("/register", isAuth, isAdmin, postTruckRegister);
truck.get("/get-all", isAuth, isAdmin, getAllTrucks);
truck.post("/status-update/:truckID", isAuth, isAdmin, postTruckUpdate);
truck.post("/edit/:truckID", isAuth, isAdmin, postTruckEdit);
truck.delete("/delete/:truckID", isAuth, isAdmin, delTruck);

export default truck;
