import {
  useMutation,
  useQueryClient,
  // useQueryClient,
  // useInfiniteQuery
} from '@tanstack/react-query';
import { createUserAccount, signInAccount, signOutAccount, updateUser } from '../appwrite/api';
import { INewUser, IUpdateUser } from '@/types';
import { QUERY_KEYS } from './queryKeys';
// import { QUERY_KEYS } from './queryKeys';

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