import User from "../models/User.js";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";
import axios from "axios";

/* ===============================
   Pesapal Config
================================ */
const PESAPAL_BASE_URL = "https://cybqa.pesapal.com/pesapalv3";
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const CURRENCY = process.env.CURRENCY || "USD";

/* ===============================
   Get Pesapal Access Token
================================ */
const getPesapalToken = async () => {
  const response = await axios.post(
    `${PESAPAL_BASE_URL}/api/Auth/RequestToken`,
    { consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data.token;
};

/* ===============================
   Get User Data
================================ */
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth().userId;
    let user = await User.findById(userId);

    if (!user) {
      const { name, email, picture } = req.auth().sessionClaims || {};
      user = await User.create({
        _id: userId,
        name: name || "New User",
        email,
        imageUrl: picture,
        enrolledCourses: [],
      });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ===============================
   Get User Enrolled Courses
================================ */
export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const user = await User.findById(userId).populate("enrolledCourses");

    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, enrolledCourses: user.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ===============================
   Purchase Course (Pesapal)
================================ */
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.auth().userId;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "courseId is required" });
    }

    // Find or auto-create user
    let user = await User.findById(userId);
    if (!user) {
      const { name, email, picture } = req.auth().sessionClaims || {};
      user = await User.create({
        _id: userId,
        name: name || "New User",
        email,
        imageUrl: picture,
        enrolledCourses: [],
      });
    }

    // Find course
    const course = await Course.findById(courseId);
    if (!course) return res.json({ success: false, message: "Course not found" });

    const amount = parseFloat(
      (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)
    );

    // Create purchase record
    const purchase = await Purchase.create({
      courseId: course._id,
      userId,
      amount,
      status: "pending",
    });

    // Pesapal payment data
    const paymentData = {
      amount,
      description: `Purchase of course: ${course.courseTitle}`,
      type: "MERCHANT",
      reference: purchase._id.toString(),
      first_name: user.name.split(" ")[0] || "Customer",
      last_name: user.name.split(" ")[1] || " ",
      email: user.email,
      phone_number: "263700000000",
      currency: CURRENCY.toUpperCase(),
      callback_url: `${process.env.APP_URL}/api/pesapal/callback`,
    };

    const token = await getPesapalToken();

    const response = await axios.post(
      `${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`,
      paymentData,
      {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      }
    );

    const redirect_url = response.data?.redirect_url;

    if (!redirect_url)
      return res.json({ success: false, message: "Pesapal did not return redirect_url" });

    res.json({
      success: true,
      message: "Purchase initialized. Click redirect_url to complete payment.",
      redirect_url,
      purchaseId: purchase._id,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.json({ success: false, message: "Pesapal initialization failed" });
  }
};
