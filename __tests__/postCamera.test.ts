import { Request, Response } from "express";
import { postCameraController } from "../src/controllers/cameras.controller";
import { postCameraService } from "../src/services/cameras.service";

jest.mock("../src/services/cameras.service", () => ({
  ...jest.requireActual("../src/services/cameras.service"),
  postCameraService: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe("postCameraController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 201 when the camera is created", async () => {
    const mockReq = {
      body: {
        ip: "192.1.1.1",
        customerId: "30b207d8-2fd7-483d-8d5d-54cb3119db70",
        name: "Camera 1",
        isEnabled: true,
      },
    } as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await postCameraController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: "Câmera cadastrada",
    });
  });

  it("should return 409 when a camera with the same IP already exists for the same customer", async () => {
    const mockReq = {
      body: {
        ip: "16.206.101.60",
        customerId: "30b207d8-2fd7-483d-8d5d-54cb3119db70",
        name: "Camera 1",
        isEnabled: true,
      },
    } as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (postCameraService as jest.Mock).mockRejectedValue(
      new Error("CAMERA_IP_ALREADY_EXISTS_WITH_CUSTOMER")
    );

    await postCameraController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(409);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: "Erro: Esse IP já existe para esse cliente.",
    });
  });

  it("should return 400 when the IP is invalid", async () => {
    const mockReq = {
      body: {
        ip: "16.206.101.60.1",
        customerId: "30b207d8-2fd7-483d-8d5d-54cb3119db70",
        name: "Camera 1",
        isEnabled: true,
      },
    } as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await postCameraController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: "IP deve ser um endereço IPv4 ou IPv6 válido",
    });
  });
});
