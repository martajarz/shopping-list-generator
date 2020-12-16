import faker from "faker";

export function generateRandomName() {
  return faker.lorem.word();
}

export function getRandomCredentials() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}
