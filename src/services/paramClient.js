import { client } from "../services/client";

export async function createParam(param) {
    const response = await client.post('/param/', param)
    return response.data
}

export async function fetchParams() {
    const response = await client.get('/param/')
    return response.data
}

export async function deleteParam(id) {
    console.log(id)
    const response = await client.delete(`/param/${id}/`);
    return response.data
}