import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { getMetrics, putMetrics, patchMetrics } from "../services/arrangeClient"

export function useGetMetrics(id) {
    return useQuery({
        queryKey: ['fetchMetrics', id],
        queryFn: () => getMetrics(id),
        enabled: !!id,
        onSuccess: () => { console.log('Sucesso') },
        onError: (error) => { console.log('Falha', error) },
    })
}

export function usePatchMetrics() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, output }) => patchMetrics(id, output),
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchMetrics']);
            console.log('Sucesso');
        },
        onError: (error) => {
            console.log('Falha', error);
        },
    });
}

export function usePutMetrics() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: putMetrics,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchMetrics']);
            console.log('Sucesso')
        },
        onError: (error) => { console.log('Falha', error) },
    })
}