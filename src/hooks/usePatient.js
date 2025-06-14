import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPatient, fetchPatients, deletePatient } from '../services/patientClient';

export function useCreatePatient() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPatient,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchPatients']);
        },
        onError: (error) => { console.log('Falha', error) },
    });
}

export function useFetchPatients() {
    return useQuery({
        queryKey: ['fetchPatients'],
        queryFn: fetchPatients,
        onSuccess: () => { console.log('Sucesso') },
        onError: (error) => { console.log('Falha', error) },
    })
}

export function useDeletePatient() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePatient,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchPatients']);
            console.log('Sucesso')
        },
        onError: (error) => { console.log('Falha', error) },
    })
}