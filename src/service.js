import axios from 'axios';

const apiUrl = 'http://localhost:5151';
axios.defaults.baseURL = apiUrl;


axios.interceptors.response.use(
  response => response, 
  error => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error); 
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`);    
    return result.data;
  },

  addTask: async(name) => {
    console.log('addTask', name);
    const response = await axios.post(`/items/post`, { name: name, isComplete: false });
    return response.data;
  },

  setCompleted: async(id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    const response = await axios.put(`/items/${id}`, { 
      isComplete: isComplete 
    });
  
    return response.data;
  },

  deleteTask: async(id) => {
    console.log('deleteTask');
    const response = await axios.delete(`/items/${id}`);
    return response.data; // החזרת נתוני התגובה במקרה של הצלחה
  }
};
