const userSchema = new mongoose.Schema({
  // ... aapke existing fields (name, email, password, etc.)
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // 🔽 YEH NAYE FIELDS ADD KAREIN 🔽
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String }, // Email verify ke liye
  resetPasswordToken: { type: String }, // Forgot password ke liye
  resetPasswordExpires: { type: Date }   // Token expiry ke liye
});