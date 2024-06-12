import { Request, Response } from "express";
import { postAlertLogController } from "../src/controllers/alertLogs.controller";

jest.mock("../src/services/alertLogs.service", () => ({
  ...jest.requireActual("../src/services/alertLogs.service"),
  postAlertLogService: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe("postAlertLogsController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 201 when the alert is created successfully", async () => {
    const mockReq = {
      body: {
        cameraId: "6fb9ad4e-29aa-476c-8880-a13102eb3ffd",
      },
    } as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await postAlertLogController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: "Alerta registado com sucesso",
    });
  });
});
