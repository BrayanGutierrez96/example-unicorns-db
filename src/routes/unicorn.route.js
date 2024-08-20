import { Router } from "express";
import {
  createUnicorn,
  deleteUnicorn,
  getUnicorn,
  getUnicorns,
  updateUnicorn,
} from "../controllers/unicorn.controller.js";

export const router = Router();

router.get("/unicorns", getUnicorns);
router.post("/unicorns", createUnicorn);
router.put("/unicorns/:unicornid", updateUnicorn);
router.get("/unicorns/:unicornid", getUnicorn);
router.delete("/unicorns/:unicornid", deleteUnicorn);
