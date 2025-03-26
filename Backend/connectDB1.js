const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// ✅ Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "calmsphere_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Convert pool to promise-based connection
const db = pool.promise();

// ✅ Define the `connectDB` function
const connectDB = async () => {
  try {
    await db.execute("SELECT 1"); // Simple query to check the connection
    console.log("✅ MySQL Database connected successfully.");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error);
    process.exit(1); // Stop server if DB connection fails
  }
};

// ✅ Export both `connectDB` and `db`
module.exports = {connectDB, db}

