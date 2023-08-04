import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFavs,
  residenceToFav,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allbookings", getAllBookings);
router.post("/cancelBooking/:id", cancelBooking);
router.post("/residenceFav/:rid", residenceToFav);
router.post("/residenceFav/", getAllFavs);

export { router as userRoute };
