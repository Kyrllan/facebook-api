import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import {
  StoreValidator,
  UpdateValidator,
} from "App/Validators/User/ForgotPassword";
import { User, UserKey } from "App/Models";
import faker from "faker";
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

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}
}
