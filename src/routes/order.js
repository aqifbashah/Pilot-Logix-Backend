import express from "express";
import isAuth from "../middleware/isAuth";
import isAdmin from "../middleware/isAdmin";
import postUploadOrder from "../controllers/order/postUploadOrder";
import getAllOrders from "../controllers/order/getAllOrders";
import postOrderUpdate from "../controllers/order/postOrderUpdate";
import postOrderEdit from "../controllers/order/postOrderEdit";
import delOrder from "../controllers/order/delOrder";

const order = express.Router();

order.post("/upload", isAuth, isAdmin, postUploadOrder);
order.get("/get-all", isAuth, isAdmin, getAllOrders);
order.post("/update/:orderID", isAuth, postOrderUpdate);
order.post("/edit/:orderID", isAuth, isAdmin, postOrderEdit);
order.delete("/delete/:orderID", isAuth, isAdmin, delOrder);

export default order;
