import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteApiEndpoint).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Sign Up a new User
    async signup({ email, password, name }: { email: string, password: string, name: string }) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name);

            if (user) {
                // If the user has been created let's login
                return this.login({ email, password })
            } else {
                return user;
            }
        } catch (error) {
            console.error(`APPWRITE AUTH ERROR :: signup :: ${error}`);
        }
    }

    // Login
    async login({ email, password }: { email: string, password: string }) {
        try {
            return this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error(`APPWRITE AUTH ERROR :: login :: ${error}`);
            return null;
        }

    }

    // Logout
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error(`APPWRITE AUTH ERROR :: logout :: ${error}`);
        }
    }

    // Current Session
    async getSession() {
        try {
            return await this.account.getSession(
                'current'
            );
        } catch (error) {
            console.error(`APPWRITE AUTH ERROR :: getSession :: ${error}`);
            return null;
        }

    }
}

const authService = new AuthService();
export default authService;