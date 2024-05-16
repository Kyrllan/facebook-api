import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { User } from "App/Models";
import { isFollowing } from "App/Utils/isFollowing";

export default class FollowersController {
  public async index({ request, auth }: HttpContextContract) {
    const { username } = request.qs();
    const user = await User.findByOrFail("username", username);

    await user.load("follows");

    const queries = user.isFollowing.map(async (user) => {
      await isFollowing(user, auth);
    });

    await Promise.all(queries);

    return user.follows;
  }
}
