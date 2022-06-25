import jwt from "jsonwebtoken"

export function encode(obj) {
    return jwt.sign(obj, process.env.PRIVATE_KEY)
}

export function decode(token) {
    return jwt.verify(token, process.env.PRIVATE_KEY)
}