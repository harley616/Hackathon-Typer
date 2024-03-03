import axios from 'axios';
 
export default class Api {
    constructor() {
        this.api = axios.create({
            baseURL: `http://localhost:4002`,
        });
    }
 
    async register(name) {
        console.log(process.env.BACKEND_TEST_PORT);
        try {
            const response = await this.api.post('/api/register', {name});
            return response.data;
        } catch (error) {
            return { error: error.message };
        }
    }

}
