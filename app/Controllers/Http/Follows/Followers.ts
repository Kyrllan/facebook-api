import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { User } from "App/Models";

export default class FollowersController {
  public async index({ request }: HttpContextContract) {
    const { username } = request.qs();
    const user = await User.findByOrFail("username", username);
    const followers = await user.related("followers").query().preload("avatar");
    return followers;
  }
}
