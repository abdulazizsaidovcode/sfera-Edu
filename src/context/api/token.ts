export const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
}

export const setConfig = () => config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`