import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages,uploadFile } from "../controllers/messagesController.js";
import multer from "multer";
const messagesRoutes = Router()

const uploads = multer({dest:"uploads/files"})
messagesRoutes.post("/get-messages",verifyToken,getMessages)
messagesRoutes.post("/upload-file",verifyToken,uploads.single("file"),uploadFile)
export default messagesRoutes;
