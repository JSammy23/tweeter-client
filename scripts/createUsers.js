import axios from 'axios';
import { faker } from '@faker-js/faker';

const BASE_URL = 'http://localhost:3000/users/';

const createUser = async (userDetails) => {
  try {
    const response = await axios.post(BASE_URL, userDetails);
    console.log(`User created: ${response.data.username}`);
  } catch (error) {
    console.error('Failed to create user:', error.response.data);
  }
};

// Set i to one number higher than last user created.
const generateUsers = async (numberOfUsers) => {
  for (let i = 4; i < numberOfUsers + 4; i++) {
    const user = {
      email: `test${i}@test.com`,
      password: 'test1234',
      confirm_password: 'test1234',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: `user${i}`,
    };

    await createUser(user);
  }
};

generateUsers(10);
