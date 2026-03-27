import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import { CardRenderer, greetings, randomGreeting } from './card-renderer';
import { render, screen } from "@testing-library/react";

test("pengecekan apakah ada text dengan value yang sesuai?", () => {
  const name = "akmal"
  const text = "guten morgen!"
  const gender = "male"
  render(<CardRenderer name={name} gender={gender} text={text} />);

  const textElement = screen.getByText("guten morgen!");
  expect(textElement).toBeTruthy();;
})

test("menampilkan random greeting dari array yang sudah di tentukan", () => {
  const result = randomGreeting()
  console.log({ result })
  expect(greetings).toContain(result);
});

test("background card warna pink saat gendernya female", () => {
  render(<CardRenderer name="neng" gender="female" text="test" />);

  const card = screen.getByTestId("card-container");
  expect(card.className).toContain("bg-[#f2a6d2]");
});