import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client.setEndpoint(conf.appwriteApiEndpoint).setProject(conf.appwriteProjectId);
        this.storage = new Storage(this.client);
    }

    // Upload a thumbnail
    async uploadThumbnail({ file }: { file: File }) {
        try {
            return this.storage.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.error(`APPWRITE STORAGE ERROR :: uploadThumbnail :: ${error}`);
        }
    }

    // Delete a thumbnail
    async deleteThumbnail({ fileId }: { fileId: string }) {
        try {
            this.storage.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error(`APPWRITE STORAGE ERROR :: uploadThumbnail :: ${error}`);
            return false;
        }
    }

    // Preview a thumbnail
    previewThumbnail({ fileId }: { fileId: string }) {
        return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    }

}

const storageService = new StorageService();
export default storageService;