import { Router } from "express";
import { generateQRCode } from "../controllers/qrController";

const router = Router();

router.post("/generate", generateQRCode);

export default router;
