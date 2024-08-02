import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class DataService{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases=new Databases(this.client)
            this.bucket=new Storage(this.client)
    }
    async createPost({title,slug,content,featuredImage,
    status,userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // slug used as ID for our collection 
                {
                    title:title,
                    content:content,
                    status:status,
                    userid:userId,
                    featuredImage
                }
            )
        }
        catch(error){
            console.log("Appwrite servie :: createPost :: error",error)
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }catch(error){
            console.log("Appwrite servie :: updatePost :: error",error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite servie :: deletePost :: error",error);
            return false;
        }
    }
    // Retriving the database post (one post)
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serice :: getPost :: error",error)
            return false;
        }
    }

    // Retriving the active posts
    async getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            console.log("Appwrite serice :: getPosts :: error",error);
            return false;
        }
    }
    // file upload methods bucket

    async uploadFile(file){
        try {
            const uploadedFile= await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            return uploadedFile
        } catch (error) {
            console.log("Appwrite serice :: uploadFile :: error",error)
            return false;
        }
    }

    // Delete File
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;  
        } catch (error) {
            console.log("Appwrite serice :: deleteFile :: error",error)
            return false;
        }
    }
    // Get File Preview
    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            ) 
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error",error)
            return false;
        }
    }

}

const service=new DataService();
export default service;