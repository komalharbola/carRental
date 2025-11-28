import imagekit from "../configs/imagekit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";
// api to change role of user
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;
    // upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });
    // for url generation,works for both image and videos
    const imageUrl = imagekit.url({
      path: response.filePath,

      transformation: [
        { width: 1280 }, //width resizing
        { quality: "auto" }, //auto compression
        { format: "webp" }, // convert to modern format
      ],
    });
    const image = imageUrl;
    await Car.create({
      ...car,
      owner: _id,
      image,
    });
    res.json({ success: true, message: "car added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API TO LIST OWNER CAR

// export const addCar = async (req, res) => {
//   try {
//     const { _id } = req.user;
//     const carData = JSON.parse(req.body.carData);

//     if (!req.file) {
//       return res.json({ success: false, message: "Image required" });
//     }

//     const fileBuffer = req.file.buffer;

//     const response = await imagekit.files.upload({
//       file: fileBuffer,
//       fileName: req.file.originalname,
//       folder: "/cars",
//     });

//     const imageUrl = response.url;

//     await Car.create({
//       ...carData,
//       owner: _id,
//       image: imageUrl,
//     });

//     res.json({ success: true, message: "car added" });
//   } catch (error) {
//     console.log("addCar ERROR:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });

    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to toggle Car Availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    // checking is car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "unauthorized" });
    }
    car.isAvailable = !car.isAvailable;

    await car.save();
    res.json({ success: true, message: "Availability Toggled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
// API to delete a car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    // checking is car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "unauthorized" });
    }
    car.owner = null;
    car.isAvailable = false;
    await car.save();
    res.json({ success: true, message: "Car Removed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;
    if (role != "owner") {
      return res.json({ success: false, message: "unauthorized" });
    }
    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id }).populate("car").sort({
      cretedAt: -1,
    });

    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    });
    const completedBookings = await Booking.find({
      owner: _id,
      status: "confirmed",
    });
    // calculate monthlyRevenue from booking where status is confirmed
    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);
    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to update user image

export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;

    const imageFile = req.file;
    // upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });
    // for url generation,works for both image and videos
    const imageUrl = imagekit.url({
      path: response.filePath,

      transformation: [
        { width: 1280 }, //width resizing
        { quality: "auto" }, //auto compression
        { format: "webp" }, // convert to modern format
      ],
    });
    const image = imageUrl;
    await User.findByIdAndUpdate(_id, { image });
    res.json({ success: true, message: "image updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// export const updateUserImage = async (req, res) => {
//   try {
//     const { _id } = req.user;
//     console.log(req.user);

//     if (!req.file) {
//       return res.json({ success: false, message: "No file uploaded" });
//     }

//     // buffer from multer.memoryStorage
//     const fileBuffer = req.file.buffer;

//     // new ImageKit v4 upload syntax
//     const response = await imagekit.files.upload({
//       file: fileBuffer,
//       fileName: req.file.originalname,
//       folder: "/users",
//     });

//     // v4 gives full URL directly
//     const imageUrl = response.url;

//     await User.findByIdAndUpdate(_id, { image: imageUrl });

//     res.json({ success: true, message: "image updated" });
//   } catch (error) {
//     console.log("updateUserImage ERROR:", error);
//     res.json({ success: false, message: error.message });
//   }
// };
