import { client } from "../services/client";

export async function createPatient(patient) {
    const response = await client.post('/patient/', patient);
    return response.data;
}

export async function fetchPatients() {
    const response = await client.get('/patient/');
    return response.data;
}

export async function updatePatient(patient) {
    const response = await client.put('/patient/', patient);
    return response.data;
}

export async function deletePatient(id) {
    const response = await client.delete(`/patient/`, { params: { id } });
    return response.data;
}
