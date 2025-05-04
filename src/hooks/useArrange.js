import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { getMetrics, putMetrics, patchMetrics, getDetails, putDetails, patchDetails } from "../services/arrangeClient"

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

export function useGetDetails(id) {
    return useQuery({
        queryKey: ['fetchDetails', id],
        queryFn: () => getDetails(id),
        enabled: !!id,
        onSuccess: () => { console.log('Sucesso') },
        onError: (error) => { console.log('Falha', error) },
    })
}

export function usePutDetails() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: putDetails,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchDetails']);
            console.log('Sucesso')
        },
        onError: (error) => { console.log('Falha', error) },
    })
}

export function usePatchDetails() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, output }) => patchDetails(id, output),
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchMetrics']);
            console.log('Sucesso');
        },
        onError: (error) => {
            console.log('Falha', error);
        },
    });
}
