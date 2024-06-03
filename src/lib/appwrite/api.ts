import { account, appwriteConfig, avatars, databases, storage } from './config';
import { AppwriteException, ID, ImageGravity, Query } from 'appwrite'
import { INewUser, IUpdateUser } from "@/types";

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
  phone?: string;
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

export async function updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };
    if(user.emailChange){
      const updateEmail = await account.updateEmail(user.email,user.password);
      if(!updateEmail) throw Error;
    }
    if(user.phone){
      const newPhone = "+54" + user.phone;
      const updatePhone = await account.updatePhone(newPhone,user.password);
      if(!updatePhone) throw Error;
    }
    const updateName = await account.updateName(user.name);

    if(user.newPassword !== "" && user.newPassword){
      const updatePassword = await account.updatePassword(user.newPassword,user.password);
      if(!updatePassword) throw Error;
    }

    if (!updateName) {
      throw Error;
    }

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      user.userId,
      {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    if (error instanceof AppwriteException) {
      throw Error(error.message);
  }else{
    throw error;
  }
}
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {``
    console.log(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}