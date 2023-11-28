import { Router } from "express";
import {
  deleteBook,
  getAllBooks,
  getSingleBook,
  postBook,
  updateBook,
} from "../controllers/bookControllers.js";

const router = Router();

router.route("/").get(getAllBooks).post(postBook);

router.route("/:id").get(getSingleBook).put(updateBook).delete(deleteBook);

export default router;
