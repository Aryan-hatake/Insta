const express = require("express");
const authRouter = require("./routes/auth.route")
const postRouter = require("./routes/post.route")
const userACRouter = require("./routes/userAc.route")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)
app.use("/api/userac",userACRouter)


module.exports = app