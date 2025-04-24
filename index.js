const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const engine = require("ejs-mate");

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(
    session({
        secret: "nutrivibe_secret",
        resave: false,
        saveUninitialized: true,
    })
);

const User = require("./models/user.js");

const MONGO_URL = "mongodb://localhost:27017/Nutrivibe";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
}
main().catch((err) => console.log(err));


const updateStreaksOnLogin = async (user) => {
    const today = new Date().toDateString(); // Ignore time
    const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate).toDateString() : null;

    if (lastLogin !== today) {
        // It's a new day! Increase streak
        user.streaks.login += 1;

        // You can add other logic too, like increasing healthyEating/exercise if a plan is followed
        user.lastLoginDate = new Date();
        await user.save();
    }
};


const calculateInitialStreaks = ( {height, weight, activity_level} ) => {
    let streaks = {
        healthyEating: 0,
        exercise: 0,
        hydration: 1,
        login: 1
    };

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters ** 2);

    if (bmi < 18.5 || bmi > 25) {
        streaks.healthyEating = 1;
    }

    const activeLevels = ["moderately-active", "very-active", "extra-active"];
    if (activeLevels.includes(activity_level)) {
        streaks.exercise = 1;
    }

    return streaks;
};


// Home route
app.get("/", (req, res) => {
    res.render("main/homepage.ejs");
});

// Login Page
app.get("/login", (req, res) => {
    res.render("main/login2.ejs");
});

app.post("/login", async (req, res) => {
    console.log("Form type:", req.body.form_type);
    console.log("All form data:", req.body);

    try {
        const {
            form_type,
            name,
            email,
            password,
            confirm_password,
            age,
            gender,
            height,
            weight,
            blood_sugar,
            heart_rate,
            blood_pressure,
            chest,
            waist,
            hip,
            primary_goal,
            target_weight,
            activity_level,
            dietary_preferences = [],
            allergies = ""
        } = req.body;

        if (form_type === "register") {
            // Validate required fields
            if (!name || !email || !password || !age || !gender || !height || !weight) {
                return res.status(400).send("All required fields must be provided");
            }
        
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send("User already exists. Please login.");
            }
        
            if (password !== confirm_password) {
                return res.status(400).send("Passwords do not match.");
            }
        
            const initialStreaks = calculateInitialStreaks({
                height: Number(height),
                weight: Number(weight),
                activity_level: activity_level || "moderately-active"
            });
        
            const newUser = new User({
                name,
                email,
                password,
                age: Number(age),
                gender,
                height: Number(height),
                weight: Number(weight),
                bloodSugar: blood_sugar ? Number(blood_sugar) : undefined,
                heartRate: heart_rate ? Number(heart_rate) : undefined,
                bloodPressure: blood_pressure || undefined,
                bodyMeasurements: {
                    chest: chest ? Number(chest) : undefined,
                    waist: waist ? Number(waist) : undefined,
                    hip: hip ? Number(hip) : undefined
                },
                healthGoals: {
                    primaryGoal: primary_goal || "Weight Loss",
                    targetWeight: target_weight ? Number(target_weight) : undefined,
                    activityLevel: activity_level || "moderately-active"
                },
                dietaryPreferences: Array.isArray(dietary_preferences) ? dietary_preferences : [],
                allergies: allergies || "",
                streaks: initialStreaks,
                lastLoginDate: new Date(),
            });
        
            await newUser.save();
            req.session.userId = newUser._id;
            res.redirect(`/dashboard/${newUser._id}`);
        } else if (form_type === "login") {
            // Your existing login code works fine
            const user = await User.findOne({ email, password });
            if (!user) {
                return res.status(401).send("Invalid email or password.");
            }

            await updateStreaksOnLogin(user); // update login streak

            req.session.userId = user._id;
            res.redirect(`/dashboard/${user._id}`);
        } else {
            res.status(400).send("Invalid form submission.");
        }
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(500).send("Server error: " + error.message);
    }
});


// Dashboard Route
app.get("/dashboard/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send("User not found!");
        }

        res.render("main/dashboard.ejs", { user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error!");
    }
});

app.get("/dashboard/:id/diet", (req, res) => {
    const userId = req.params.id;
    res.render("main/diet.ejs", { userId });
});

app.get("/dashboard/:id/exercise", (req, res) => {
    const userId = req.params.id;
    res.render("main/exercise.ejs", { userId });
});

app.get("/dashboard/:id/streak", async (req, res) => {

    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.render("main/streak.ejs", { user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/dashboard/:id/chatbot", (req, res) => {
    const userId = req.params.id;
    res.render("main/chatbot.ejs", { userId });
});

app.get("/dashboard/:id/profile", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.render("main/profile.ejs", { user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/privacy", (req, res) => {
    res.render("main/privacy.ejs");
});

app.get("/team", (req, res) => {
    res.render("main/team.ejs");
});

app.get("/terms", (req, res) => {
    res.render("main/terms.ejs");
});

app.get("/faq", (req, res) => {
    res.render("main/faq.ejs");
});

app.listen(8080, () => {
    console.log("App is listening on port 8080");
});