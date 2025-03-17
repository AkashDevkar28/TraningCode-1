import axios from 'axios';

// Function to fetch users
export const fetchUsers = async () => {
  const { data } = await axios.get('https://dummyjson.com/users');
  return data.users; // Extract the users from the response
};