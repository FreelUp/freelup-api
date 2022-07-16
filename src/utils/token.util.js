import jwt from "jsonwebtoken";

export function encode(obj, options = {}) {
  return jwt.sign(obj, process.env.PRIVATE_KEY, options);
}

export function decode(token) {
  return jwt.verify(token, process.env.PRIVATE_KEY);
}
