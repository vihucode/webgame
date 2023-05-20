import axios from 'axios'
const baseUrl = '/api/categories'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const get = (categoryName) => {
  const request = axios.get(baseUrl, categoryName)
  return request.then((response) => response.data)
}

const updateActive = async (id, status) => {

  try {
    const response = await axios.put(`${baseUrl}/${id}`, {
      active: status,
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    throw new Error('Failed to update category active status');
  }
};


const module = {
  getAll,
  get,
  updateActive
}

export default module
