import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  // useQueryClient,
  // useInfiniteQuery
} from '@tanstack/react-query';
import { createUserAccount, signInAccount, signOutAccount, updateUser , forgotPasswordAccount, newPasswordAccount, createPost, updatePost, getPosts, getPostById } from '../appwrite/api';
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types';
import { QUERY_KEYS } from './queryKeys';

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user)
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: {
      email: string;
      password: string;
    }) => signInAccount(user)
  })
}

export const useForgotPasswordAccount = () => {
  return useMutation({
    mutationFn: (user: {
      email: string
    }) => forgotPasswordAccount(user)
  })
}

export const useNewPasswordAccount = () => {
  return useMutation({
    mutationFn: (recovery: {
      password: string,
      userId: string,
      secret: string
    }) => newPasswordAccount(recovery)
  })
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: INewPost) => {
      const result = await createPost(post);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: IUpdatePost) => {
      const result = await updatePost(post);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};


// export const usePosts = () => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_POSTS],
//     queryFn: getPosts,
//     onError: (error: Error) => {
//       console.error('Error fetching posts:', error);
//     }
//   });
// };

// export const usePost = (postId:string) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_POST_BY_ID],
//     queryFn: () => getPostById(postId),
//     enabled: !!postId, 
//     onSuccess: (data) => {
//       console.log('Post loaded successfully', data);
//     },
//     onError: (error: Error) => {
//       console.error('Failed to load post', error);
//     }
//   });
// }

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getPosts as any,
    getNextPageParam: (lastPage: any) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null; 
      }

      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
    initialPageParam: null // O cualquier valor inicial relevante para tu paginación
  });
};


export const useGetPostById = (postId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

