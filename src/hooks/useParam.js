import { createParam, fetchParams, deleteParam } from "../services/paramClient";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export function useCreateParam() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createParam,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchParams']);
        },
        onError: (error) => { console.log('Falha', error) },
    })
}

export function useFetchParams() {
    return useQuery({
        queryKey: ['fetchParams'],
        queryFn: fetchParams,
        onSuccess: () => { console.log('Sucesso') },
        onError: (error) => { console.log('Falha', error) },
    })
}

export function useDeleteParam() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteParam,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchParams']);
            console.log('Sucesso')
        },
        onError: (error) => { console.log('Falha', error) },
    })
}