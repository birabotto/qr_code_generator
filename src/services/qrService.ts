import QRCode from "qrcode";
import { CloudinaryRepository } from "../repositories/cloudinaryRepository";
import { QRCodeRequest, QRCodeResponse } from "../models/qrModel";

export class QRService {
  private cloudinaryRepo: CloudinaryRepository;

  constructor() {
    this.cloudinaryRepo = new CloudinaryRepository();
  }

  async generateQRCode({
    content,
    size,
  }: QRCodeRequest): Promise<QRCodeResponse> {
    const buffer = await QRCode.toBuffer(content, {
      width: size,
      errorCorrectionLevel: "L",
    });

    const imageUrl = await this.cloudinaryRepo.uploadImage(buffer);
    return { qr_code_url: imageUrl };
  }
}
