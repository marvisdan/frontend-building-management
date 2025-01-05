import { descendingComparator, getComparator } from "../utils";

describe("descendingComparator", () => {
  it("should return -1 when b[orderBy] is less than a[orderBy]", () => {
    const dataA = { name: "Alice", age: 30 };
    const dataB = { name: "Bob", age: 25 };
    const orderBy = "age";

    const result = descendingComparator(dataA, dataB, orderBy);

    expect(result).toBe(-1);
  });

  it("should return 1 when b[orderBy] is greater than a[orderBy]", () => {
    const dataA = { name: "Alice", age: 30 };
    const dataB = { name: "Bob", age: 35 };
    const orderBy = "age";

    const result = descendingComparator(dataA, dataB, orderBy);

    expect(result).toBe(1);
  });

  it("should return 0 when b[orderBy] is equal to a[orderBy]", () => {
    const dataA = { name: "Alice", age: 30 };
    const dataB = { name: "Bob", age: 30 };
    const orderBy = "age";

    const result = descendingComparator(dataA, dataB, orderBy);

    expect(result).toBe(0);
  });

  it("should handle string comparisons", () => {
    const dataA = { name: "Alice", age: 30 };
    const dataB = { name: "Bob", age: 25 };
    const orderBy = "name";

    const result = descendingComparator(dataA, dataB, orderBy);

    // In this case, "Bob" comes before "Alice" alphabetically
    expect(result).toBe(1);
  });

  it("should handle number comparisons", () => {
    const dataA = { value: 10 };
    const dataB = { value: 5 };
    const orderBy = "value";

    const result = descendingComparator(dataA, dataB, orderBy);

    // In this case, 5 comes before 10 numerically
    expect(result).toBe(-1);
  });
});

describe("getComparator", () => {
  // Mock descendingComparator function
  const descendingComparatorMock = jest.fn<number, any[]>();

  it("should return a descending comparator function when order is 'desc'", () => {
    const order = "desc";
    const orderBy = "name";

    // Mock descendingComparator to return -1
    descendingComparatorMock.mockReturnValue(1);

    const comparator = getComparator(order, orderBy);

    const result = comparator({ name: "Alice" }, { name: "Bob" });

    expect(result).toBe(1);
  });

  it("should return an ascending comparator function when order is 'asc'", () => {
    const order = "asc";
    const orderBy = "age";

    // Mock descendingComparator to return 1
    descendingComparatorMock.mockReturnValue(1);

    const comparator = getComparator(order, orderBy);

    const result = comparator({ age: 30 }, { age: 25 });

    expect(result).toBe(1);
  });
});
