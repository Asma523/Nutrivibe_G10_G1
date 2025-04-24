const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other", "Prefer not to say"], required: true },
    height: { type: Number, required: true }, // in cm
    weight: { type: Number, required: true }, // in kg
    bloodSugar: { type: Number, default: null }, // mg/dL
    heartRate: { type: Number, default: null }, // bpm
    bloodPressure: { type: String, default: null }, // e.g., "120/80"
    bodyMeasurements: {
        chest: { type: Number, default: null }, // inches
        waist: { type: Number, default: null }, // inches
        hip: { type: Number, default: null }, // inches
    },
    healthGoals: {
        primaryGoal: { type: String, enum: ["Weight Loss", "Muscle Gain", "Maintenance", "Fitness"], required: true },
        targetWeight: { type: Number, default: null }, // in kg
        activityLevel: { type: String, enum: ["sedentary", "lightly-active", "moderately-active", "very-active", "extra-active"], required: true },
    },
    dietaryPreferences: {
        type: [String],
        default: []
    },    
    allergies: { type: String, default: null }, // Comma-separated values
    streaks: {
        healthyEating: { type: Number, default: 0 },
        exercise: { type: Number, default: 0 },
        hydration: { type: Number, default: 0 },
        login: { type: Number, default: 0 },
      },
    lastLoginDate: { type: Date, default: null },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
