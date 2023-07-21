import express from "express";
import customerRoutes from "./src/routes/customerRoutes.js";
import loginRoutes from "./src/routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use("/photos", express.static("customerPhotos"));

// app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.append("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/customers", customerRoutes);
app.use("/api", loginRoutes);

app.listen(PORT, () => {
  console.log(`api escuchando en el puerto ${PORT}`);
});
