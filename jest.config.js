export default {
  transform: {},
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["./jest.setup.js"], // Archivo para configuraciones previas
};
