import { left } from "fp-ts/Either";

export type CustomError = {
  message: string;
  statusCode: number;
};

export const leftCustomError = <T>(message: string, statusCode: number) => {
  return left<CustomError, T>({ message, statusCode });
};
