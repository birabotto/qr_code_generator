import { QRService } from "../services/qrService";
import { CloudinaryRepository } from "../repositories/cloudinaryRepository";

jest.mock("../repositories/cloudinaryRepository");

describe("QRService", () => {
  let qrService: QRService;
  let mockCloudinaryRepo: jest.Mocked<CloudinaryRepository>;

  beforeEach(() => {
    mockCloudinaryRepo =
      new CloudinaryRepository() as jest.Mocked<CloudinaryRepository>;
    (CloudinaryRepository as jest.Mock).mockImplementation(
      () => mockCloudinaryRepo
    );
    qrService = new QRService();
  });

  it("should generate QR code and return URL", async () => {
    const mockUrl = "https://res.cloudinary.com/test/image/upload/test.png";
    mockCloudinaryRepo.uploadImage.mockResolvedValue(mockUrl);

    const result = await qrService.generateQRCode({
      content: "https://example.com",
      size: 250,
    });

    expect(result).toEqual({ qr_code_url: mockUrl });
    expect(mockCloudinaryRepo.uploadImage).toHaveBeenCalled();
  });

  it("should throw error if upload fails", async () => {
    mockCloudinaryRepo.uploadImage.mockRejectedValue(
      new Error("Upload failed")
    );

    await expect(
      qrService.generateQRCode({ content: "https://example.com", size: 250 })
    ).rejects.toThrow("Upload failed");
  });
});
