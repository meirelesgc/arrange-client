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
