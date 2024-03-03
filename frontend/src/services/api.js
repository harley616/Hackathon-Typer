import axios from 'axios';
 
export default class Api {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3001',
            withCredentials: true,
        });
    }
 
    async register(name) {
        try {
            const response = await this.api.post('/api/register', {name: name});
            return response.data;
        } catch (error) {
            return { error: error.message };
        }
    }
    async get(){
        try {
            const response = await this.api.get('/api');
            console.log(response.data);
            return response.data;
        } catch (error) {
            return { error: error.message };
        }
    }
    async postScore(score, name){
        try {
            const response = await this.api.post('/api/score', {score: score, name: name});
            return response.data;
        } catch (error) {
            return { error: error.message };
        }
    }
    async getLeaderBoard(){
        console.log('getLeaderBoard');
        // try {
        //     const response = await this.api.get('/api/leaderboard');
        //     return response.data;
        // } catch (error) {
        //     return { error: error.message };
        // }
    }

}
