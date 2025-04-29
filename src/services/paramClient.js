import { client } from "../services/client";

export async function createParam(param) {
    console.log(param)
    const response = await client.post('/param/', param)
    return response.data
}