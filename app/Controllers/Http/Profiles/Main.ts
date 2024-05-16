import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { User } from "App/Models";
import { isFollowing } from "App/Utils/isFollowing";

export default class MainController {
  public async show({ request, auth }: HttpContextContract) {
    const { username } = request.qs();

    const user = await User.query()
      .where("username", username)
      .preload("avatar")
      .withCount("posts")
      .withCount("followers")
      .withCount("follows")
      .firstOrFail();

    if (user.id !== auth.user?.id) {
      await isFollowing(user, auth);
    }

    return user.serialize({
      fields: {
        omit: ["email", "createdAt", "updatedAt"],
      },
    });
  }
}
