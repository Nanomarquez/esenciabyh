import { account, appwriteConfig, avatars, databases, storage } from './config';
import { AppwriteException, ID, ImageGravity, Query } from 'appwrite'
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";

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

export async function forgotPasswordAccount(user: { email: string }){
  try {
    const forgotPassword = await account.createRecovery(user.email,'http://localhost:5173/new-password');
    if(!forgotPassword) throw Error;
    return forgotPassword;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function newPasswordAccount(recovery: { password: string , userId: string, secret: string }){
  try {
    const forgotPassword = await account.updateRecovery(recovery.userId,recovery.secret,recovery.password);
    if(!forgotPassword) throw Error;
    return forgotPassword;
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
  if (!(file instanceof File)) {
    console.error("No valid file provided for upload.");
    return null; 
  }
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.error("Failed to upload file:", error);
    return null; // Retorna null si hay un error
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
  } catch (error) {
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

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}


export async function createPost(post: INewPost) {
  try {
    // Subir las imágenes de post y obtener URLs
    const uploadedFiles = await Promise.all(post.postImages.map(uploadFile));
    const successfulUploads = uploadedFiles.filter(file => file);

    // Manejar error de carga
    if (successfulUploads.length !== post.postImages.length) {
      await Promise.all(successfulUploads.map(file => deleteFile(file!.$id)));
      throw new Error('Error al subir algunos archivos.');
    }

    // Obtener URLs de imágenes subidas
    const fileUrls = await Promise.all(successfulUploads.map(async file => {
      const url = getFilePreview(file!.$id);
      if (!url) {
        await deleteFile(file!.$id);
        throw new Error(`Error al obtener URL del archivo: ${file!.$id}`);
      }
      return { url, id: file!.$id };
    }));

    // Subir la imagen de portada
    const uploadedCoverImage = await uploadFile(post.coverImage);
    if (!uploadedCoverImage) throw new Error('Failed to upload cover image');

    const coverImageUrl = getFilePreview(uploadedCoverImage.$id);
    if (!coverImageUrl) {
      await deleteFile(uploadedCoverImage.$id);
      throw new Error('Error al obtener la URL de la imagen de portada.');
    }

    // Crear el documento del post en la base de datos
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        title: post.title,
        description: post.description,
        imagesUrl: fileUrls.map(file => file.url),
        coverImageUrl,
        categories: post.categories,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    );

    if (!newPost) {
      // Limpiar si falla la creación del documento
      await Promise.all(fileUrls.map(file => deleteFile(file.id)));
      await deleteFile(uploadedCoverImage.$id);
      throw new Error('Error al crear el post en la base de datos.');
    }

    if (newPost) {
      await addPostToUser(post.userId, newPost.$id); // Asegúrate de pasar sólo el ID
    }

    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

  export async function addPostToUser(userId: string, postId: string) {
    try {
      const user = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        userId
      );

      const updatedPosts = [...(user.posts || []), postId];

      const updatedUser = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        userId,
        { posts: updatedPosts }
      );

      return updatedUser;
    } catch (error) {
      console.error('Failed to add post to user:', error);
      throw new Error('Failed to update user with new post');
    }
  }


export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        title: post.title,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        description: post.description,
        categories: post.categories,
      }
    );

    if (!updatedPost) {
      if (hasFileToUpdate) {
        
        await deleteFile(image.imageId);
      }

      throw Error;
    }

    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts({ pageParam }: { pageParam: number }) {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}



export async function getPostById(postId?: string) {
  if (!postId) throw Error;

  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}
