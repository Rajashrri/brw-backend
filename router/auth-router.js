const express = require("express");
const passport = require("passport");

const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const {signupSchema , loginSchema } =require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const  authMiddleware = require("../middlewares/auth-middleware");
const csvcontrollers = require("../controllers/csv-controller");
const Customer = require("../models/customer-model");


router.route("/").get(authcontrollers.home);

router
    .route("/register")
    .post(validate(signupSchema),authcontrollers.register);

router.route("/login").post(validate(loginSchema), authcontrollers.login);
router.route("/authverify").post(authcontrollers.authverify);
router.route("/resendverify").post(authcontrollers.resendverify);
router.route("/forgot").post(authcontrollers.forgot);
router.route("/verify-reset-token").post(authcontrollers.verifyResetToken);
router.route("/resetpassword").post(authcontrollers.resetpassword);

router.route("/user").get(authMiddleware, authcontrollers.user);

// **Google Authentication Routes**
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", async (err, user, info) => {
            if (err) {
                console.error("Google Auth Error:", err);
                return res.status(500).json({ message: "Authentication Failed", error: err });
            }
            if (!user) {
                return res.status(401).json({ message: "No User Found", info });
            }
            // req.logIn(user, (err) => {
            //     if (err) {
            //         console.error("Login Error:", err);
            //         return res.status(500).json({ message: "Login Failed", error: err });
            //     }
            //     return res.redirect("http://localhost:5173/");
            // });
            try {
                const token = await user.generateToken2();// Call token method from User model
                return res.redirect(`http://localhost:5173/?token=${token}`);
            } catch (error) {
                console.error("Token Generation Error:", error);
                return res.status(500).json({ message: "Token Generation Failed", error: error.message });
            }
        })(req, res, next);
    }
);


router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).send("Logout failed");
        res.redirect("http://localhost:5173/");
    });
});

router.get("/status", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: "Not Authenticated" });
    }
});


//  Facebook Authentication
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
    "/facebook/callback",
    (req, res, next) => {
        passport.authenticate("facebook", async (err, user, info) => {
            if (err) {
                console.error("facebook Auth Error:", err);
                return res.status(500).json({ message: "Authentication Failed", error: err });
            }
            if (!user) {
                return res.status(401).json({ message: "No User Found", info });
            }
            // req.logIn(user, (err) => {
            //     if (err) {
            //         console.error("Login Error:", err);
            //         return res.status(500).json({ message: "Login Failed", error: err });
            //     }
            //     return res.redirect("http://localhost:5173/");
            // });
            try {
                const token = await user.generateToken2();// Call token method from User model
                return res.redirect(`http://localhost:5173/?token=${token}`);
            } catch (error) {
                console.error("Token Generation Error:", error);
                return res.status(500).json({ message: "Token Generation Failed", error: error.message });
            }
        })(req, res, next);
    }
);

module.exports = router;