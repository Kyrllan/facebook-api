import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import {
  StoreValidator,
  UpdateValidator,
} from "App/Validators/User/ForgotPassword";
import { User, UserKey } from "App/Models";
import faker from "@faker-js/faker";
import Mail from "@ioc:Adonis/Addons/Mail";

export default class ForgotPasswordsController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator);

    const user = await User.findByOrFail("email", email);

    const key = faker.datatype.uuid() + user.id;

    user.related("keys").create({ key });

    const link = `${redirectUrl.replace(/\/$/, "")}/${key}`;

    // envio do email
    await Mail.send((message) => {
      message.to(email);
      message.from("contato@facebook.com", "Facebook");
      message.subject("Recuperação de senha");
      message.htmlView("emails/forgot-password.edge", { link });
    });
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail("key", params.key);

    await userKey.load("user");

    return userKey.user;
  }

  public async update({ request, response }: HttpContextContract) {
    const { key, password } = await request.validate(UpdateValidator);

    const userKey = await UserKey.findByOrFail("key", key);

    const user = await userKey.related("user").query().firstOrFail();

    user.merge({
      password,
    });

    await user.save();

    await userKey.delete();

    return response.ok({ message: "Senha atualizada com sucesso!" });
  }
}
