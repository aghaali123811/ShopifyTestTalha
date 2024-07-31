import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Local API base URL

class APIService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      // You can add additional Axios configuration options here, e.g. headers, timeout, etc.
    });
  }

  async signup(email, password, name) {
    try {
      const response = await this.api.post('/v1/signup', {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async login(email, password) {
    try {
      const response = await this.api.post('/v1/signin', {email, password});
      return response.data;
    } catch (error) {
      console.log('error ', error);
      throw error;
    }
  }
}

export default new APIService();
