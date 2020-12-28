import faker from "faker";

export function generateRandomName() {
  return faker.lorem.word();
}

export function getRandomCredentials() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export function generateRandomString() {
  let randomString = "";

  for (let i = 0; i < 3; i++) {
      randomString += Math.random().toString(36).substr(2, 5);
  }
  return randomString;
}
