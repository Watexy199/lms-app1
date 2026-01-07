import { clerkClient } from "@clerk/express";

//Middleware {Protect Educator Routes}

export const protectEducator = async (req, res, next)=>{
    try {
        const userId = req.auth.userId
        const response = await clerkClient.users.getUser(userId)

        if(response.publicMetadata.role !== "educator"){
            return res.json({success:false, message: "Unauthorized Access"})
        }

        next()
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

// import { clerkClient } from "@clerk/express";

// export const protectEducator = async (req, res, next) => {
//   try {
//     // ✅ Ensure user is authenticated
//     if (!req.auth || !req.auth.userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authenticated",
//       });
//     }

//     const userId = req.auth.userId;

//     // ✅ Fetch user from Clerk
//     const user = await clerkClient.users.getUser(userId);

//     // ✅ Check educator role
//     if (user.publicMetadata?.role !== "educator") {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized access",
//       });
//     }

//     next(); // 🚀 allow request
//   } catch (error) {
//     console.error("protectEducator error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Authorization failed",
//     });
//   }
// };
