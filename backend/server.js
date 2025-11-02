import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import categoriesRoute from "./routes/categories.js";

// CRITICAL FIX: IMPORT THE BOOKTRANSACTION MODEL TO REGISTER ITS SCHEMA WITH MONGOOSE
import BookTransaction from "./models/BookTransaction.js"; 

// ⚠️ IMPORTANT: Import your routes
import authRoute from "./routes/auth.js"; 
import userRoute from "./routes/users.js"; 
import booksRoute from "./routes/books.js";
import transactionRoute from "./routes/transactions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// CORS Configuration: Allows frontend (port 3001) to talk to backend (port 4000)
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // NOTE: useNewUrlParser and useUnifiedTopology are often no longer needed 
      // in recent Mongoose versions (6+), but keeping them won't hurt if you're on an older version.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Library Management System Backend Running...");
});

// ROUTE USAGE: Link the routes
app.use("/api/auth", authRoute); 
app.use("/api/users", userRoute); 
app.use("/api/categories", categoriesRoute);
app.use("/api/books", booksRoute);
// ⭐ FIX APPLIED HERE: Changed "/api/transaction" to "/api/transactions"
app.use("/api/transactions", transactionRoute); 

// Start the server and assign it to a variable for graceful shutdown
const server = app.listen(PORT, () => {
  console.log(`Server is running in PORT ${PORT}`);
});

// ✅ GRACEFUL SHUTDOWN LOGIC
process.on('SIGINT', () => {
    console.log('\nSIGINT signal received. Closing HTTP server...');
    server.close(() => {
        console.log('HTTP server closed. Port 4000 released. Exiting cleanly.');
        process.exit(0); // Exits the process cleanly
    });
});


