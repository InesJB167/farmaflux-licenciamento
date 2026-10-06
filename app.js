import express from "express";
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())//para que serve vc??

export default app