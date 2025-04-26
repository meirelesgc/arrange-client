import { client } from "../services/client";

export async function createDoc(file) {
    const response = await client.post('/doc/', file, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
}

export async function fetchDoc() {

}

export async function deleteDoc() {

}


