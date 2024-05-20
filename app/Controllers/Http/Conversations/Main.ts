import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Conversation } from "App/Models";

export default class ConversationController {
  public async index({ response, auth }: HttpContextContract) {
    const conversations = await Conversation.query()
      .where({ userIdOne: auth.user!.id })
      .orWhere({ userIdTwo: auth.user!.id })
      .preload("userOne", (query) => {
        query.whereNot("id", auth.user!.id);
        query.preload("avatar");
      })
      .preload("userTwo", (query) => {
        query.whereNot("id", auth.user!.id);
        query.preload("avatar");
      });

    return response.ok(conversations);
  }

  public async show({ params, response, auth }: HttpContextContract) {
    const conversation = await Conversation.findByOrFail("id", params.id);

    if (
      ![conversation.userIdOne, conversation.userIdTwo].includes(auth.user!.id)
    ) {
      return response.unauthorized();
    }

    await conversation.load("messages");

    return response.ok(conversation);
  }
}
