import { createParam } from "../services/paramClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateParam() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createParam,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchParams']);
            console.log('Sucesso')
        },
        onError: (error) => { console.log('Falha', error) },
    })
}