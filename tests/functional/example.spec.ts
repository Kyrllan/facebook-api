import { test } from "@japa/runner";

test.group("Example", () => {
  test("assert sum", (test) => {
    const result = 2 + 2;

    test.assert.equal(result, 4);
  });
});
