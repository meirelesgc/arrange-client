import { client } from "../services/client";

const baseURL = import.meta.env.VITE_API_URL;

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


export async function fetchDocFile(id) {
    return baseURL + `/doc/${id}/file/`
}

export async function deleteDoc({ id }) {
    const response = await client.delete(`/doc/${id}/`);
    return response.data;
}




