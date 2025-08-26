import app from "./app";
// import { connectToDatabase } from "./libs/db";

const PORT = process.env.PORT || 4000;

 function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to server:", err);
    process.exit(1);
  }
}

startServer();
