import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { User } from "App/Models";
import { StoreValidator } from "App/Validators/Follows";

export default class FollowController {
  public async store({ request, auth }: HttpContextContract) {
    const { followingId } = await request.validate(StoreValidator);

    const followingUser = await User.findOrFail(followingId);

    followingUser.related("followers").attach([auth.user!.id]);
  }
}
