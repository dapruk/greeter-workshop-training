import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment:  "jsdom", // Ganti ke 'jsdom' jika mengetes komponen React UI
  transform: {
    // Tambahkan opsi useESM di sini
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    // Penting jika Anda mengimport file .js di dalam file .ts
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^~/(.*)$': '<rootDir>/app/$1',
  },
};
