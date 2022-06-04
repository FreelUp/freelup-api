export default {
  setupFiles: ["./test/dotenv-config.js"],
  setupFilesAfterEnv: ['./jest.setup.js'],
  modulePathIgnorePatterns: ["src/"],
  verbose: true
};
