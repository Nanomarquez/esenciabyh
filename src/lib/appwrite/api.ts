import { account, appwriteConfig, avatars, databases, /*storage*/ } from './config';
import { AppwriteException, ID, /*ImageGravity,*/ Query } from 'appwrite'
import { INewUser } from "@/types";

export async function createUserAccount(user: INewUser){
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    )
    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);
    if(!avatarUrl) throw Error;
    const newUser = await saveUserToDB({
      name: newAccount.name,
      lastname: user.lastname,
      email: newAccount.email,
      accountId: newAccount.$id,
      imageUrl: avatarUrl,
      phone: user.phone
    })
    return newUser;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId:string;
  email:string;
  name: string;
  imageUrl: URL;
  lastname: string;
  phone: string;
}){
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    )
    if(!newUser) throw Error;
    return newUser
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;
    
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error; 

    return currentUser.documents[0];

  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function signOutAccount(){
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export async function signInAccount(user: { email: string; password: string; }) {
  try {
    const session = await account.createEmailPasswordSession(user.email, user.password);
    return session;
  } catch (error) {
    if (error instanceof AppwriteException) {
      throw Error(error.message);
  }else{
    throw error;
  }
}}