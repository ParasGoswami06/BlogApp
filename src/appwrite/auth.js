import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        this.client.setProject(conf.appwriteProjectId)
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //call Another method
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }
    // Login

    async login({email,password}){
        try{
            const userAccount=await this.account.createEmailPasswordSession(email, password);
            return userAccount;
        }
        catch(error){
            throw error;
        }
    }
    //Checking if you are loged in or not

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log("Appwrite service :: getCurrentUser :: error",error)
        }
        return null
    }
    //Logout

    async logout(){
        try{
             await this.account.deleteSessions('current')

        }catch(error){
            console.log("Appwrite service :: logout :: error",error);
        }
    }
}

const authService=new AuthService();

export default authService;
