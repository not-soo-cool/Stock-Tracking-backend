import express from "express";
import {
  login,
  logout,
  getUser,
  myProfile,
  // contact,
  // updateUser,
  addTiles,
  addMarbles,
  getTiles,
  getMarbles,
  getTile,
  updateTile,
  deleteTile,
  getMarble,
  updateMarble,
  deleteMarble,
  getAllTiles,
  getAllMarbles,
  checkTiles,
  checkMarbles,
  createOrder,
  viewOrder,
  allOrders,
  contact,
  dateOrders,
  // register,
} from "../controller/User.js";
import { isAuthenticated } from "../middlewares/auth.js";
export const userRouter = express.Router();

// userRouter.route("/register").post(register);

userRouter.route("/login").post(login);

userRouter.route("/logout").get(logout);

userRouter.route("/user").get(getUser);

userRouter.route("/me").get(isAuthenticated, myProfile);

// userRouter.route("/admin/update").put(isAuthenticated, updateUser);

userRouter.route("/admin/tiles/add").post(isAuthenticated, addTiles);
userRouter.route("/admin/marbles/add").post(isAuthenticated, addMarbles);

userRouter.route("/admin/tiles/all").get(isAuthenticated, getTiles);
userRouter.route("/admin/marbles/all").get(isAuthenticated, getMarbles);

userRouter.route("/admin/tile/:id")
.get(isAuthenticated, getTile)
.put(isAuthenticated, updateTile)
.delete(isAuthenticated, deleteTile);

userRouter.route("/admin/marble/:id")
.get(isAuthenticated, getMarble)
.put(isAuthenticated, updateMarble)
.delete(isAuthenticated, deleteMarble);

userRouter.route("/tiles/search").post(isAuthenticated, getAllTiles);

userRouter.route("/tiles/check").post(isAuthenticated, checkTiles);

userRouter.route("/marbles/check").post(isAuthenticated, checkMarbles);

userRouter.route("/marbles/search").post(isAuthenticated, getAllMarbles);

userRouter.route("/order/create").put(isAuthenticated, createOrder);

userRouter.route("/view/orders/all").get(isAuthenticated, allOrders);

userRouter.route("/view/order/:id").get(isAuthenticated, viewOrder);

userRouter.route("/date/orders").post(isAuthenticated, dateOrders);

userRouter.route("/contact").post(contact);