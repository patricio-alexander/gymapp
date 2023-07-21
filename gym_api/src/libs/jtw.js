import jwt from "jsonwebtoken";

function createAccessToken({ payload }) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, "secretKey", { algorithm: "HS256" }, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
}

export { createAccessToken };
