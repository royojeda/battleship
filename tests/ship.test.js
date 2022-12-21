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

describe("hit()", () => {
  test("isSink() returns false if hits after hit() is less than length", () => {
    const newShip = new Ship({
      length: 5,
      hits: 0,
    });
    newShip.hit();
    expect(newShip.isSunk()).toBe(false);
  });

  test("isSink() returns true if hits after hit() is equal to length", () => {
    const newShip = new Ship({
      length: 5,
      hits: 4,
    });
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
  });

  test("isSink() returns false for a ship of different length that will not sink after hit()", () => {
    const newShip = new Ship({
      length: 3,
      hits: 1,
    });
    newShip.hit();
    expect(newShip.isSunk()).toBe(false);
  });

  test("isSink() returns true for a ship of different length that will sink after hit()", () => {
    const newShip = new Ship({
      length: 3,
      hits: 2,
    });
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
  });
});
