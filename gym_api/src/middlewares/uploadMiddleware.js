import multer from "multer";
import { join, extname } from "path";
import fileDirName from "../file-dir-name.js";
import { unlink } from "fs/promises";
import pool from "mysql2/promise";

const connection = pool.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ironFitness",
});

const getPhotoName = async (customerId) => {
  const [[{ photo }]] = await connection.query(
    "SELECT photo FROM customers WHERE customerId = ?",
    [customerId]
  );
  return photo;
};

const saveNewPhotoNameinDb = async (newPhotoName, customerId) => {
  await connection.query(
    "UPDATE customers SET photo = ? WHERE customerId = ?",
    [newPhotoName, customerId]
  );
};

const { __dirname } = fileDirName(import.meta);

const diskStorage = multer.diskStorage({
  destination: join(__dirname, "../../customerPhotos"),
  filename: (req, file, callback) => {
    const photoName = `${
      Date.now() + "-" + Math.round(Math.random() * 1e9)
    }${extname(file.originalname)}`;
    callback(null, photoName);
  },
});

const diskStorageToUpdatePhoto = multer.diskStorage({
  destination: join(__dirname, "../../customerPhotos"),
  filename: async (req, file, callback) => {
    const photoNameToDelete = await getPhotoName(req.params.customerId);
    unlink(join(__dirname, `../../customerPhotos/${photoNameToDelete}`));
    const newPhoto = `${
      Date.now() + "-" + Math.round(Math.random() * 1e9)
    }${extname(file.originalname)}`;
    saveNewPhotoNameinDb(newPhoto, req.params.customerId);
    callback(null, newPhoto);
  },
});

const upload = multer({ storage: diskStorage }).single("photo");
const uploadUpdatePhoto = multer({ storage: diskStorageToUpdatePhoto }).single(
  "photo"
);

const removePhoto = async (req, res, next) => {
  const photoNameToDelete = await getPhotoName(req.params.customerId);
  unlink(join(__dirname, `../../customerPhotos/${photoNameToDelete}`));
  next();
};

export { upload, uploadUpdatePhoto, removePhoto };
