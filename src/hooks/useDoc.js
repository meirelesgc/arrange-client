import { createDoc, fetchDocs, deleteDoc } from '../services/docClient'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateDoc() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDoc,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchDocuments']);
            console.log('Sucesso')
        },
        onError: (error) => { console.log('Falha', error) },
    })
}

export function useFetchDocs() {
    return useQuery({
        queryKey: ['fetchDocs'],
        queryFn: fetchDocs,
        onSuccess: () => { console.log('Sucesso') },
        onError: (error) => { console.log('Falha', error) },
    })
}

export function useDeleteDoc() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteDoc({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchDocuments']);
        },
        onError: (error) => { console.log('Falha', error) },
    });
}
