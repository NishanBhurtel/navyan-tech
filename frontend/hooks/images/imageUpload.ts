import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/utils/firebase";

interface UploadResult {
  progress: number;
  urls: string[];
  isCompleted: boolean;
}

export const useUploadImages = () => {
  const uploadImages = async (files: File[]): Promise<UploadResult> => {
    if (!files || files.length === 0) {
      return { progress: 0, urls: [], isCompleted: true };
    }

    const uploadedUrls: string[] = [];
    let progress = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `navyan/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (err) => reject(err),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              uploadedUrls.push(downloadURL);
              resolve();
            }
          );
        });
      }

      return { progress: 100, urls: uploadedUrls, isCompleted: true };
    } catch (err) {
      return { progress, urls: [], isCompleted: false };
    }
  };

  return { uploadImages  };
};
