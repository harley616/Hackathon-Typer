import axios from 'axios';
 
export default class Api {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3001',
        });
    }
 
    async register(name) {
        try {
            const response = await this.api.post('/api/register', {name});
            return response.data;
        } catch (error) {
            return { error: error.message };
        }
    }

}
