import { client } from "../services/client";

export async function createDoc(file) {
    const response = await client.post('/doc/', file, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
}

export async function fetchDocs() {
    const response = await client.get('/doc/')
    return response.data
}

export async function deleteDoc({ id }) {
    const response = await client.delete(`/doc/${id}/`);
    return response.data;
}




