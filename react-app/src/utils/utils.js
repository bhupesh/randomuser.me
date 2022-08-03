import {
  API_URL, seed, nationalities, noOfUsers
} from '../config/config';

const handleNetworkError = async (error) => {
  console.log(error);
};

export const fetchUsers = () => fetch(`${API_URL}/?results=${noOfUsers}&seed=${seed}&nat=${nationalities}`, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})
  .catch((error) => handleNetworkError(error));
