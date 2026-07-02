import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    const token = req.headers.token;

    if(!token) {
        return res.json("user has not logged in")
    }

    const decode = jwt.verify(token, "krishna")
    const username = decode.username

    if(!username) {
        return res.json("incorrect token")
    }

    req.username = username;

    next()
}

export default authMiddleware;