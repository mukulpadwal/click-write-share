const conf = {
    appwriteApiEndpoint: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    developmentURL: String(import.meta.env.VITE_DEVELOPMENT_URL),
    productionURL: String(import.meta.env.VITE_PRODUCTION_URL),
}

export default conf;