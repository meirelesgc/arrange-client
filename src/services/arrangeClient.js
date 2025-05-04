import { client } from "./client";

export async function getMetrics(id) {
    const response = await client.get(`/arrange/${id}/metrics/`)
    return response.data
}

export async function putMetrics(id) {
    const response = await client.put(`/arrange/${id}/metrics/`)
    return response.data
}

export async function patchMetrics(id, output) {
    const response = await client.patch(`/arrange/${id}/metrics/`, output);
    return response.data;
}

export async function getDetails(id) {
    const response = await client.get(`/arrange/${id}/details/`)
    return response.data
}

export async function putDetails(id) {
    const response = await client.put(`/arrange/${id}/details/`)
    return response.data
}

export async function patchDetails(id, output) {
    const response = await client.patch(`/arrange/${id}/details/`, output);
    return response.data;
}