import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { StoreValidator, UpdateValidator } from "App/Validators/User/Register";
import { User, UserKey } from "App/Models";
import faker from "faker";
import Mail from "@ioc:Adonis/Addons/Mail";
import Database from "@ioc:Adonis/Lucid/Database";

export default class UserRegisterController {
  public async store({ request }: HttpContextContract) {
    // transdaction: desfazer todo o processo caso alguma operacao falhe
    await Database.transaction(async (trx) => {
      const { email, redirectUrl } = await request.validate(StoreValidator);

      const user = new User();

      user.useTransaction(trx);

      user.email = email;

      await user.save();

      const key = faker.datatype.uuid() + user.id;

      user.related("keys").create({
        key,
      });

      const link = `${redirectUrl.replace(/\/$/, "")}/${key}`;

      // envio do email
      await Mail.send((message) => {
        message.to(email);
        message.from("contato@facebook.com", "Facebook");
        message.subject("Ative sua conta");
        message.htmlView("emails/register.edge", { link });
      });
    });
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail("key", params.key);
    const user = await userKey.related("user").query().firstOrFail();

    return user;
  }

  public async update({ request, response }: HttpContextContract) {
    const { key, name, password } = await request.validate(UpdateValidator);

    const userKey = await UserKey.findByOrFail("key", key);

    const user = await userKey.related("user").query().firstOrFail();

    const username = name.split(" ")[0].toLowerCase() + new Date().getTime();

    user.merge({
      name,
      password,
      username,
    });

    await user.save();

    await userKey.delete();

    return response.ok({ message: "Usuário criado com sucesso!" });
  }
}
