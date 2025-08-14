import { token, user, createUser, mySelf } from "../services/userClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useToken() {
    return useMutation({
        mutationFn: token,
        onSuccess: () => { console.log('Sucesso') },
        onError: (error) => { console.log('Falha', error) },
    })
}

export function useCreateUser() {
    return useMutation({
        mutationFn: createUser,
        onSuccess: (data) => { console.log('Usuário criado com sucesso', data) },
        onError: (error) => { console.log('Falha ao criar usuário', error) },
    })
}

export function useUser(id) {
    return useQuery({
        queryKey: ['fetchUser', id],
        queryFn: () => user({ id }),
        enabled: !!id,
    });
}

export function useMySelf(options) {
    return useQuery({
        queryKey: ['mySelf'],
        queryFn: mySelf,
        ...options,
    });
}