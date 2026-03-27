import { genderSubtitles, nameAnalyzer, subtitles } from "./personalization";
import { test, expect } from '@jest/globals';

test("personalization for name", () => {
  const name = "Dapruk";

  const result = nameAnalyzer(name);

  expect(result).toEqual(`Delighted to have you here, ${name}!`);
});

test("personalization for valid gender", () => {
  const gender: "male" | "female" = "male";

  const expectedResult = subtitles[gender];

  const result = genderSubtitles(gender);

  expect(expectedResult).toContain(result);
});
