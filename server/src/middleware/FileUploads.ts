//src/middleware/FileUploads.ts
import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { BadRequest } from "./Error";
import log from "../utils/logger";

// Ensure upload directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer to use diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const newFilename = `${baseName}-${uniqueSuffix}${ext}`;
    cb(null, newFilename);
  }
});

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimeTypes = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequest("Invalid file type. Only PDF, text, and Word documents are allowed."));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB size limit
  },
});

// Middleware for file uploads
export function uploadFile(req: Request, res: Response, next: NextFunction) {
  if (req.body.use_existing_resume) {
    return next();
  }

  const uploadSingle = upload.single("resume");
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(new BadRequest(`File upload failed: ${err.message}`));
    } else if (err?.message === "Unexpected end of form") {
      return next(new BadRequest(`No file Uploaded`));
    } else if (err) {
      return next(new BadRequest(`An unknown error occurred during the upload: ${err.message}`));
    }

    if (!req.file) {
      return next(new BadRequest("No file uploaded"));
    }

    log.info(`File Upload Successful: ${req.file.filename}`);
    next();
  });
}

// Function to delete the uploaded file from local storage
export function deleteFile(path: string): Promise<void> {
  log.info(`File Deleted: ${path}`);
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
