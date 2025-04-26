import { createDoc } from '../services/docClient'
import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

export function useCreateDoc() {
    return useMutation({
        mutationFn: createDoc,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchDocuments']);
            console.log('Sucesso')
        },
        onError: (error) => { console.log('Falha', error) },
    })
}