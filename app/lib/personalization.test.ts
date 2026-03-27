import { genderSubtitles, nameAnalyzer, subtitles } from "./personalization";

test("personalization for name", () => {
  const name = "Dapruk";

  const result = nameAnalyzer(name);

  expect(result).toEqual(`Delighted to have you here, ${name}!`);
});

test("personalization for valid gender", () => {
  const expectedResult = subtitles;

  const gender: "male" | "female" = "male";

  const result = genderSubtitles(gender);

  expect(expectedResult).toContain(result);
});
