const mongoose = require("mongoose");
const User = require("./models/user.js");

const MONGO_URL = "mongodb://localhost:27017/Nutrivibe";

main().then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
})


async function main(){
    await mongoose.connect(MONGO_URL);
}

let allUsers = [
    {
        name: "Amit Sharma",
        email: "amit@gmail.com",
        password: "hashedpassword123",
        age: 28,
        gender: "Male",
        height: 175,
        weight: 72,
        bloodSugar: 90,
        heartRate: 75,
        bloodPressure: "120/80",
        bodyMeasurements: {
            chest: 40,
            waist: 32,
            hip: 38
        },
        healthGoals: {
            primaryGoal: "Fitness",  // ✅ Required
            targetWeight: 70,
            activityLevel: "moderately-active" // ✅ Required
        },
        dietaryPreferences: ["Vegetarian"],
        allergies: "None"
    }
];
module.exports = allUsers;


User.insertMany(allUsers);