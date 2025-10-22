import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const { PORT = 8080, MONGODB_URI } = process.env;

async function bootstrap() {
  try {
    await connectDB(MONGODB_URI);
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Bootstrap error:", err);
    process.exit(1);
  }
}
bootstrap();
