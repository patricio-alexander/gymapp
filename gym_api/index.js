import express from "express";
import customerRoutes from "./src/routes/customerRoutes.js";
import loginRoutes from "./src/routes/authRoutes.js";
import priceRoutes from "./src/routes/priceRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { join } from "path";
import fileDirName from "./src/file-dir-name.js";

const app = express();
const PORT = 3000;
// const { __dirname } = fileDirName(import.meta);

app.use("/photos", express.static("customerPhotos"));

// app.use(express.static(join(__dirname, "../client/dist")));

// app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.append("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: "http://dev.gym.com", credentials: true }));
const allowedOrigins = [
  "http://dev.gym.com",
  "http://localhost",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Verifica si el origen está en la lista de orígenes permitidos
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido por CORS"));
    }
  },
  optionsSuccessStatus: 200,

  credentials: true, // Permite el envío de cookies y encabezados de autenticación
};

app.use(cors(corsOptions));

app.use("/api/customers", customerRoutes);
app.use("/api", loginRoutes);
app.use("/api/price", priceRoutes);

app.listen(PORT, () => {
  console.log(`api escuchando en el puerto ${PORT}`);
});
