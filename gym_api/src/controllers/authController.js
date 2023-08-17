import { userFound } from "../database/db.js";
import { createAccessToken } from "../libs/jtw.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userFound({ username });
    
    if (!user) {
      return res.status(400).json({ message: "Datos incorrectos" });
    }
    
    
    const isCorrectPasword = await bcrypt.compare(password, user.password);
    if (!isCorrectPasword) {
      return res.status(400).json({ message: "Datos incorrectos" });
    }
    const payload = {
      userId: user.userId,
      userName: user.userName,
    };

    const token = await createAccessToken({ payload });
    // res.cookie("token", token);
    res.json({ message: "User auth", token });
    // console.log(await isCorrectPasword);
    // res.json(password);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const logout = (req, res) => {
//   res.cookie("token", "", { expires: new Date(0) });
//   return res.sendStatus(200);
// };

const verifyToken = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, "secretKey", async (error, user) => {
    if (error) return res.status(401).json({ message: "Unauthorized" });
    const isUser = await userFound({ username: user.userName });
    if (!isUser) return res.status(401).json({ message: "Unauthorized" });
    return res.json({
      userId: isUser.userId,
      username: isUser.userName
    });
  });
};

export { login, verifyToken };
