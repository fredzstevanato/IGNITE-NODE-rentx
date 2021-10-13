import fs from "fs";

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } finally {
    await fs.promises.unlink(filename);
  }
};
