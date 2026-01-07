import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/mongodb.js"
import { clerkWebhooks } from "./controllers/webhooks.js"
import educatorRouter from "./routes/educatorRoutes.js"
import { clerkMiddleware } from "@clerk/express"
import courseRouter from "./routes/courseRoute.js"
import userRouter from "./routes/userRoutes.js"

const app = express()

// Connect DB ONCE (important for serverless)
await connectDB()

// Middlewares
app.use(cors())
app.use(clerkMiddleware())

// Routes
app.get("/", (req, res) => res.send("API Working"))
app.post("/clerk", express.json(), clerkWebhooks)
app.use("/api/educator", express.json(), educatorRouter)
app.use("/api/course", express.json(), courseRouter)
app.use("/api/user", express.json(), userRouter)

// Pesapal webhook (raw body)
app.post("/pesapal", express.raw({ type: "application/json" }))

// ✅ EXPORT APP (NO app.listen)
export default app





// import express from "express"
// import cors from "cors"
// import 'dotenv/config'
// import connectDB from "./configs/mongodb.js"
// import { clerkWebhooks } from "./controllers/webhooks.js"
// import educatorRouter from "./routes/educatorRoutes.js"
// import { clerkMiddleware } from "@clerk/express"
// import courseRouter from "./routes/courseRoute.js"
// import userRouter from "./routes/userRoutes.js"

// //Initialize express
// const app = express()

// //Connect to database
// await connectDB()


// //Middlewares
// app.use(cors())
// app.use(clerkMiddleware())

// //Routes
// app.get("/", (req,res) => res.send("API Working"))
// app.post("/clerk", express.json(), clerkWebhooks)
// app.use("/api/educator", express.json(), educatorRouter)
// app.use("/api/course", express.json(), courseRouter)
// app.use("/api/user", express.json(), userRouter)
// app.post("/pespal",express.raw({type:"application/json"})) 
// //Port
// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })