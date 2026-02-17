const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized user"
        })
    }

    let validToken;

    try {
        validToken = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized User"
        })
    }

    req.user = validToken.id
    
    req.username = validToken.username
    next()

}

module.exports = {identifyUser}


//middle ware is a block of code that does something  what you want before reaching towards main api logic(controller)

// use to avoid repetetion in code and many more reasons yet to explore


//once done just put next() at end of middleware logic so that req can go forward towards controller