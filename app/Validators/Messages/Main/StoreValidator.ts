import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string({ trim: true }),
    receiverId: schema.number([rules.exists({ table: "users", column: "id" })]),
  });

  public messages: CustomMessages = {};
}
