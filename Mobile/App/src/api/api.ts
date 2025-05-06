import axios from 'axios';

export const baseURL = 'http://10.0.2.2:3000';


export function getHeaders() {
    return {
        'Content-Type': 'application/json',
    }
}



export function getAuthorization(token: string){

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}
export default axios.create({
    baseURL
})