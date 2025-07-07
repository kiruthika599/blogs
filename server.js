const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });
const app = express();
app.use(cors());
app.use(express.json());
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env');
  process.exit(1);
}
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ DB connection failed:', error.message);
    process.exit(1);
  }
};
connectDB();
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.use((err, req, res, next) => {
  console.error('❌', err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
