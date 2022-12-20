import Ship from "../src/ship";

describe("isSunk()", () => {
  test("returns false if the number of hits is less than the length", () => {
    const newShip = new Ship({
      length: 5,
      hits: 0,
    });
    expect(newShip.isSunk()).toBe(false);
  });
  test("returns true if the number of hits is equal to the length", () => {
    const newShip = new Ship({
      length: 3,
      hits: 3,
    });
    expect(newShip.isSunk()).toBe(true);
  });
});
