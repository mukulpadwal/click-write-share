import { Client, Databases, Query } from "appwrite";
import conf from "../conf/conf";

class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(conf.appwriteApiEndpoint).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    // List all the published blogs
    async getBlogs(queries = [Query.equal("published", true)]) {
        try {
            return this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.error(`APPWRITE DB ERROR :: getBlogs :: ${error}`);
        }
    }

    // Create a new blog
    async createBlog(slug: string, { title, content, thumbnail, userId, published }: { title: string, content: string, thumbnail: string, userId: string, published: boolean }) {
        try {
            await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title: title,
                content: content,
                thumbnail: thumbnail,
                userId: userId,
                published: published
            })
        } catch (error) {
            console.error(`APPWRITE DB ERROR :: createBlog :: ${error}`);
        }
    }

}

const databaseService = new DatabaseService();
export default databaseService;