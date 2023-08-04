import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Crear un usuario en la DB
export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating a User");

  let { email } = req.body;

  const userExist = await prisma.user.findUnique({ where: { email: email } });

  if (!userExist) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else {
    res.send(201).json({ message: "User already registered" });
  }
});

// Reservar una visita
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This visit is already booked by your account" });
    } else {
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("Your visit has been booked successfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get all the bookings for a specific user

export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Cancel a booking from a user

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.send("Booking cancelled successfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Add a residency in favourites list of a user

export const residenceToFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  console.log(rid)
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });
      res.send({ message: "Removed from favourites", user: updateUser})
    } else {
        const updateUser = await prisma.user.update({
            where: {email},
            data: {
                favResidenciesID: {
                    push: rid
                }
            }
        })
        res.send({ message: "Updated Favourites", user: updateUser})
    }
  } catch (error) {
    throw new Error(error.message);
  }
});


// Get all favourites from a user

export const getAllFavs = asyncHandler(async(req, res) => {
    const {email} = req.body;
    try {
        const favouritesRes = await prisma.user.findUnique({
            where: { email },
            select: { favResidenciesID: true }
        })
        res.status(200).send(favouritesRes);
    } catch (error) {
        throw new Error(error.message);
    }
})
