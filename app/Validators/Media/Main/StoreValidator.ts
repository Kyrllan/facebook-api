import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      size: "500mb",
      extnames: ["jpg", "png", "jpeg", "mp4", "mov"],
    }),
  });

  public cacheKey = this.ctx.routeKey;

  public messages: CustomMessages = {
    "file.size": "Tamanho inválido.",
    "file.extnames":
      "Extensão inválida. (Extensões permitidas: jpg, png, jpeg, mp4, mov)",
  };
}
