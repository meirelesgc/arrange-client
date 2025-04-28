import { token, user } from "../services/userClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useToken() {
    return useMutation({
        mutationFn: token,
        onSuccess: () => { console.log('Sucesso') },
        onError: (error) => { console.log('Falha', error) },
    })
}

export function useUser(id) {
    return useQuery({
        queryKey: ['fetchUser', id],
        queryFn: () => user({ id }),
        enabled: !!id,
    });
}
