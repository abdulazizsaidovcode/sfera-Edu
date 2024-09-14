export const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
}

<<<<<<< HEAD
export const setConfig = () => config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
=======
export const imgConfig = {
    headers: {
        'multipart/type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
}

export const setConfig = () => config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
export const setImgConfig = () => imgConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`   
>>>>>>> c4fb316ff0b394011b49cc1bdf5a67fbd182177a
