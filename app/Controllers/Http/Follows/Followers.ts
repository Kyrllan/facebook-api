import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { User } from "App/Models";

export default class FollowersController {
  public async index({ request }: HttpContextContract) {
    const { username } = request.qs();
    const user = await User.findByOrFail("username", username);

    await user.load("followers");

    return user.followers;
  }

  public async destroy({ params, auth }: HttpContextContract) {
    const user = auth.user!;

    await user.related("followers").detach([params.id]);
  }
}
