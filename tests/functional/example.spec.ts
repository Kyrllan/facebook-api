import { test } from "@japa/runner";
import { request } from "../utils";

test.group("Example", () => {
  //Teste basico soma
  test("assert sum", (t) => {
    const result = 2 + 2;

    t.assert.equal(result, 4);
  });
  //Teste mostrar pagina
  test("display welcome page", async ({ client }) => {
    const response = await client.get(process.env.APP_URL + "/user-register");

    response.assertStatus(200);
    response.assertTextIncludes("<p>Bem-vindo ao Facebook!</p>");
  });
  //Teste de requisição HTTP
  test("HTTP request", async (client) => {
    const { body } = await request.get("/").expect(200);
    client.assert.exists(body.hello);
    client.assert.equal(body.hello, "world");
  });
});
