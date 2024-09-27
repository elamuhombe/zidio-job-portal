//src/services/ErrorHandler.ts
import { HttpError } from './../middleware/Error';

export function handleError(error: unknown): void {
  if (error instanceof HttpError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new HttpError((error as any).status || 500, error.message || "Internal Server Error");
  }

  throw new HttpError(500, "An unknown error occurred");
}
