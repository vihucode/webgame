import axios from 'axios'
const baseUrl = '/api/users'

const login = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const get = (username) => {
  const request = axios.get(baseUrl, username)
  return request.then((response) => response.data)
}

const updateActive = async (id, score, category, status) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, {
      score: score,
      category: category,
      status: status,
    });
    return await response.data;
  } catch (error) {
    console.error(error.response.data);
    throw new Error('Failed to update user active status');
  }
};


const module = {
  login,
  getAll,
  get,
  updateActive
}

export default module
