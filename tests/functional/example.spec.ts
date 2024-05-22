import { test } from "@japa/runner";

test.group("Example", () => {
  test("assert sum", (t) => {
    const result = 2 + 2;

    t.assert.equal(result, 4);
  });
  test("display welcome page", async ({ client }) => {
    const response = await client.get(process.env.APP_URL + "/user-register");

    response.assertStatus(200);
    response.assertTextIncludes("<p>Bem-vindo ao Facebook!</p>");
  });
});
