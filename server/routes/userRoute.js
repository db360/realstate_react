import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFavs,
  residenceToFav,
} from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck,  bookVisit);
router.post("/allbookings", getAllBookings);
router.post("/cancelBooking/:id", jwtCheck,  cancelBooking);
router.post("/residenceFav/:rid", jwtCheck,  residenceToFav);
router.post("/residenceFav/", jwtCheck,  getAllFavs);

export { router as userRoute };
