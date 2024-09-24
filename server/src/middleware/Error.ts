//src/middleware/Error.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

// Base class for HTTP errors
export class HttpError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status; // Initialize the status property
        this.name = "HttpError"; // Set the error name
    }
}

// Other error classes
export class BadRequest extends HttpError {
    constructor(message: string) {
        super(400, message);
    }
}

// Other error classes like ResourceNotFound, Unauthorized, etc.
// Error class for resource not found (HTTP 404)
export class ResourceNotFound extends HttpError {
  constructor(message: string) {
      super(404, message); // Call base class with status code 404
  }
}

// Error class for unauthorized access (HTTP 401)
export class Unauthorized extends HttpError {
  constructor(message: string) {
      super(401, message); // Call base class with status code 401
  }
}
export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    const message = `Route not found: ${req.originalUrl}`;
    res.status(404).json({ success: false, status: 404, message });
};
// Error class for forbidden access (HTTP 403)
export class Forbidden extends HttpError {
  constructor(message: string) {
      super(403, message); // Call base class with status code 403
  }
}

// Error class for conflict (HTTP 409)
export class Conflict extends HttpError {
  constructor(message: string) {
      super(409, message); // Call base class with status code 409
  }
}

export const errorHandler = (
    err: HttpError,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    const { status, message } = err;
    const cleanedMessage = message.replace(/"/g, "");
    res.status(status || 500).json({
        success: false,
        status,
        message: cleanedMessage,
    });
};

