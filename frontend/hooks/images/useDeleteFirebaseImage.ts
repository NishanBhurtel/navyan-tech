import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/utils/firebase";

interface DeleteResult {
  progress: number;
  successCount: number;
  failedUrls: string[]; // URLs that failed to delete
  isCompleted: boolean;
}

export const useDeleteImages = () => {
  const deleteImages = async (urls: string[]): Promise<DeleteResult> => {
    if (!urls || urls.length === 0) {
      return {
        progress: 0,
        successCount: 0,
        failedUrls: [],
        isCompleted: true,
      };
    }

    const failedUrls: string[] = [];
    let successCount = 0;
    let progress = 0;

    try {
      // Process deletions in parallel for efficiency
      const deletePromises = urls.map(async (url, index) => {
        try {
          // Extract path from URL: remove base URL and query params
          const pathMatch = url.match(/\/o\/(.*?)(?:\?|$)/);
          if (!pathMatch) {
            throw new Error(`Invalid URL: ${url}`);
          }
          const path = decodeURIComponent(pathMatch[1].replace(/%2F/g, "/"));
          const storageRef = ref(storage, path);
          await deleteObject(storageRef);
          return { success: true, index };
        } catch (err) {
          console.error(`Failed to delete ${url}:`, err);
          return { success: false, index, url };
        }
      });

      const results = await Promise.all(deletePromises);
      successCount = results.filter((r) => r.success).length;
      failedUrls.push(
        ...results.filter((r) => !r.success).map((r) => (r as any).url)
      );

      // Calculate overall progress (100% if completed)
      progress = 100;
    } catch (err) {
      console.error("Batch delete error:", err);
      progress = 0;
    }

    return { progress, successCount, failedUrls, isCompleted: true };
  };

  return { deleteImages };
};