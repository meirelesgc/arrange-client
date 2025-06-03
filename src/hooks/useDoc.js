import { createDoc, fetchDocs, deleteDoc, fetchDocFile } from '../services/docClient'
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



export function useFetchDocFile(id) {
    return useQuery({
        queryKey: ['fetchDocFile', id],
        queryFn: () => fetchDocFile(id),
        enabled: !!id,
        onSuccess: (data) => {
            console.log('Arquivo recuperado com sucesso:', data);
        },
        onError: (error) => {
            console.error('Erro ao recuperar o arquivo:', error);
        },
    });
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
