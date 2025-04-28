export function setToken(token) {
    localStorage.setItem('token', token)
}

export function getToken() {
    return localStorage.getItem('token')
}

export function removeToken() {
    localStorage.removeItem('token')
}

export function setId(id) {
    localStorage.setItem('id', id)
}

export function getId() {
    return localStorage.getItem('id')
}

export function removeId() {
    localStorage.removeItem('id')
}