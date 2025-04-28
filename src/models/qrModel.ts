import Joi from "joi";

export interface QRCodeRequest {
  content: string;
  size?: number;
}

export interface QRCodeResponse {
  qr_code_url: string;
}

export const qrCodeSchema = Joi.object({
  content: Joi.string().required(),
  size: Joi.number().integer().min(100).max(1000).default(250),
});
