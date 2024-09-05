import express from "express";
const router = express.Router();
import urlController from "../controller/urlController.js";

router.post("/shorten", urlController.getShortURL);

router.get("/:shortURL", urlController.redirectOriginalURL);

export default router;
