import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

//init. expresss app
const app = express();
//connect db
await connectDB();
//middleware
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // your frontend
//     credentials: true, // allow cookies
//   })
// );

app.use(json());

app.get("/", (req, res) => {
  res.send("server is running");
});
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
