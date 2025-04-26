import { client } from "../services/client";
import { setToken } from "../services/auth";

export async function token({ email, password }) {
    const form = new URLSearchParams()
    form.append('username', email)
    form.append('password', password)
    const response = await client.post('/token/', form.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    setToken(response.data.access_token)
    return response.data
}
