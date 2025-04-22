import express from "express"
import { login, logout, signup, updateProfile, updateCollections, deleteCollections, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET for not gettings values
// POST for getting values

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.put("/update-collections", protectRoute, updateCollections);

router.put("/delete-collections", protectRoute, deleteCollections);

router.get("/check", protectRoute, checkAuth);

export default router;