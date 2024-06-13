import { NextFunction, Request, Response } from "express";
import { Either, left, right } from "fp-ts/lib/Either";
import jwt from "jsonwebtoken";

export const generateToken = (name: string): Either<Error, string> => {
  try {
    const token = jwt.sign({ name }, process.env.JWT_SECRET as string, {
      expiresIn: "12h",
    });

    if (!token) return left(new Error("Ocorreu um erro ao tentar gerar o token"));

    return right(token);
  } catch (error) {
    return left(new Error("Ocorreu um erro ao tentar gerar o token"));
  }
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const tokenParts = authorization.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "bearer") {
      return res.status(401).json({ message: "Token inválido" });
    }

    const token = tokenParts[1];

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(403).json({ message: "Token inválido" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

const verifyToken = (token: string) => {
  try {
    const formatedToken = token?.replace(/["']/g, "");
    const decoded = jwt.verify(formatedToken, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido");
  }
};
