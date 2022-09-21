import axios from 'axios';

export const client = (token?: string) => {
    const defaultOptions = {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };

    return {
        get: (url: string, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
        post: (url: string, data?: any, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
        put: (url: string, data?: any, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
        delete: (url: string, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
    };
};