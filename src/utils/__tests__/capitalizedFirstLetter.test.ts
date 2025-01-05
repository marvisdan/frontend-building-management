import { capitalizedFirstLetter } from "../capitalizedFirstLetter";

describe("capitalizedFirstLetter", () => {
  it("should handle an empty string", () => {
    const result = capitalizedFirstLetter("");
    expect(result).toBe("");
  });

  it("should capitalize the first letter of a lowercase string", () => {
    const result = capitalizedFirstLetter("hello");
    expect(result).toBe("Hello");
  });

  it("should capitalize only the first letter of an uppercase string", () => {
    const result = capitalizedFirstLetter("WORLD");
    expect(result).toBe("World");
  });

  it("should handle a string with only one character", () => {
    const result = capitalizedFirstLetter("x");
    expect(result).toBe("X");
  });
});
