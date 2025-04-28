import { Request, Response } from "express";
import { QRService } from "../services/qrService";
import { qrCodeSchema, QRCodeRequest } from "../models/qrModel";

const qrService = new QRService();

export const generateQRCode = async (req: Request, res: Response) => {
  try {
    const { error, value } = qrCodeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const response = await qrService.generateQRCode(value as QRCodeRequest);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error generating QR Code" });
  }
};
