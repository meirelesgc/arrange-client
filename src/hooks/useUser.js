import { token } from "../services/userClient";
import { useMutation } from "@tanstack/react-query";

export function useToken() {
    return useMutation({
        mutationFn: token,
        onSuccess: () => { console.log('Sucesso') },
        onError: (error) => { console.log('Falha', error) },
    })
}