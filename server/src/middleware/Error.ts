//src/middleware/Error.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

// Base class for HTTP errors
class HttpError extends Error {
  status_code: number; // HTTP status code for the error
  success: boolean = false; // Indicates whether the error is a success

  constructor(statusCode: number, message: string) {
    super(message); // Call the parent constructor with the message
    this.name = this.constructor.name; // Set the error name to the class name
    this.status_code = statusCode; // Set the HTTP status code
  }
}

// Error class for bad requests (HTTP 400)
class BadRequest extends HttpError {
  constructor(message: string) {
    super(400, message); // Call base class with status code 400
  }
}

// Error class for resource not found (HTTP 404)
class ResourceNotFound extends HttpError {
  constructor(message: string) {
    super(404, message); // Call base class with status code 404
  }
}

// Error class for unauthorized access (HTTP 401)
class Unauthorized extends HttpError {
  constructor(message: string) {
    super(401, message); // Call base class with status code 401
  }
}

// Error class for forbidden access (HTTP 403)
class Forbidden extends HttpError {
  constructor(message: string) {
    super(403, message); // Call base class with status code 403
  }
}

// Error class for conflict (HTTP 409)
class Conflict extends HttpError {
  constructor(message: string) {
    super(409, message); // Call base class with status code 409
  }
}

// Error class for invalid input (HTTP 422)
class InvalidInput extends HttpError {
  constructor(message: string) {
    super(422, message); // Call base class with status code 422
  }
}

// Error class for server errors (HTTP 500)
class ServerError extends HttpError {
  constructor(message: string) {
    super(500, message); // Call base class with status code 500
  }
}

// Middleware to handle routes that are not found
const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  const message = `Route not found: ${req.originalUrl}`; // Message for the not found route
  res.status(404).json({ success: false, status: 404, message }); // Respond with 404 status
};

// Error handling middleware to standardize error responses
const errorHandler = (
  err: HttpError, // Error object
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { success, status_code, message } = err; // Destructure properties from the error
  const cleanedMessage = message.replace(/"/g, ""); // Clean message for response
  res.status(status_code || 500).json({ // Respond with the appropriate status code
    success: success || false,
    status_code,
    message: cleanedMessage,
  });
};

// Exporting error classes and middleware functions for use in other parts of the application
export {
  BadRequest,
  Conflict,
  Forbidden,
  HttpError,
  InvalidInput,
  ResourceNotFound,
  ServerError,
  Unauthorized,
  errorHandler,
  routeNotFound,
};
