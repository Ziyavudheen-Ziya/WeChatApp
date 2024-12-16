import { Router } from "express"
import { login, signup ,getUserInfo,updateProfile,profileImageUpdate,deleteProfileImage, logOut} from "../controllers/AuthController.js"
import { verifyToken } from "../middlewares/AuthMiddleware.js"
import multer from "multer"


const authRoutes = Router()
const upload = multer({dest:"uploads/profiles/"})

authRoutes.post("/signup",signup)
authRoutes.post('/login',login)
authRoutes.get('/userInfo', verifyToken, getUserInfo)
authRoutes.post('/update-profile',verifyToken,updateProfile)
authRoutes.post('/add-profile-image',verifyToken,upload.single("profile-image") ,profileImageUpdate)
authRoutes.delete('/remove-profile-image',verifyToken,deleteProfileImage)
authRoutes.post('/logout',logOut)
export default authRoutes