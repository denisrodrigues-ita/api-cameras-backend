import { Request, Response } from "express";
import { postCustomersController } from "../src/controllers/customers.controller";

jest.mock("../src/services/customers.service", () => ({
  ...jest.requireActual("../src/services/customers.service"),
  postCustumerService: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe("postCustomerController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 201 when the customer is created successfully", async () => {
    const mockReq = {
      body: {
        name: "John Doe",
      },
    } as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await postCustomersController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: "Cliente cadastrado",
    });
  });
});
