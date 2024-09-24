//src/middleware/MegaUpload.ts
import fs from "fs";
import { Storage } from 'megajs';
import config from "../config";
import { deleteFile } from "./FileUploads"; // Import deleteFile function

// Upload to MEGA
export async function uploadToMega(filePath: string, originalFileName: string) {
  try {
    // Validate MEGA credentials
    if (!config.MEGA_EMAIL || !config.MEGA_PASSWORD) {
      throw new Error("MEGA_EMAIL and MEGA_PASSWORD must be defined in the config.");
    }
    
    const folder = config.MEGA_FOLDER;
    if (!folder) {
      throw new Error("MEGA_FOLDER must be defined in the config.");
    }

    // Create Mega storage instance
    const storage = await new Storage({
      email: config.MEGA_EMAIL,
      password: config.MEGA_PASSWORD,
    }).ready;

    const fileStream = fs.createReadStream(filePath);
    const existingFolder = storage.root.children?.find(child => child.name === folder);
    const uploadFolder = existingFolder || await storage.root.mkdir(folder);

    // Upload the file
    const uploadStream = uploadFolder.upload(originalFileName);
    fileStream.pipe(uploadStream);

    return new Promise<string>((resolve, reject) => {
      uploadStream.on('finish', async () => {
        console.log('File successfully uploaded to Mega!');
        await deleteFile(filePath);

        // Ensure uploadFolder.children is defined
        if (uploadFolder.children) {
          const uploadedFile = uploadFolder.children.find(child => child.name === originalFileName);
          if (uploadedFile) {
            const uploadedFileLink = uploadedFile.link(true);
            resolve(uploadedFileLink);
          } else {
            reject(new Error('Uploaded file reference not found'));
          }
        } else {
          reject(new Error('Upload folder has no children'));
        }
      });

      uploadStream.on('error', (err) => {
        console.error('Error during file upload to Mega:', err);
        reject(new Error('Failed to upload file'));
      });
    });

  } catch (error) {
    console.error('Error uploading file to Mega:', error);
    throw new Error('Failed to upload file');
  }
}
