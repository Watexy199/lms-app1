// import express from "express";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/callback", async (req, res) => {
  try {
    const { reference, status } = req.body;

    if (!reference) {
      return res.status(400).json({ success: false, message: "Missing reference" });
    }

    const purchase = await Purchase.findById(reference);
    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }

    switch (status?.toUpperCase()) {
      case "COMPLETED":
        purchase.status = "completed";

        const user = await User.findById(purchase.userId);
        if (user && !user.enrolledCourses.includes(purchase.courseId)) {
          user.enrolledCourses.push(purchase.courseId);
          await user.save();
        }
        break;

      case "FAILED":
        purchase.status = "failed";
        break;

      default:
        purchase.status = "pending";
        break;
    }

    await purchase.save();
    res.status(200).json({ success: true, message: "Callback processed" });
  } catch (error) {
    console.error("Pesapal callback error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
