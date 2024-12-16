import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoutes from './routes/AuthRoutes.js'
import contactRoutes from './routes/ContactRoutes.js'
import setUpSockent from './socket.js'
import messagesRoutes from './routes/MessagesRoute.js'
import channelRoutes from './routes/ChannelRoutes.js'
dotenv.config();

const app = express()
const port = process.env.PORT || 3001
const databasaeUrl = process.env.DATABASE_URL;


app.use(cors({
 origin:process.env.ORIGIN||"http://localhost:5173",
  methods:["GET","POST","PUT","PATCH","DELETE"],
  credentials:true,

}))

app.use("/uploads/profiles/",express.static("uploads/profiles/"))
app.use("/uploads/files",express.static("uploads/files"))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/auth",authRoutes)
app.use('/api/contacts', contactRoutes);
app.use('/api/messages',messagesRoutes)
app.use('/api/channel',channelRoutes)
mongoose.connect(databasaeUrl).then(()=>console.log(`Database connected successfull`)).catch(err=>console.log(err.message))

const server = app.listen(port,()=>{

     console.log(`Server is running at http://localhost:${port}`);
     
})

setUpSockent(server)