import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { User } from "App/Models";

export default class SearchController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { keyword } = request.qs();

      const users = await User.query()
        .where("name", "LIKE", `%${keyword}%`)
        .orWhere("username", "LIKE", `%${keyword}%`)
        .orWhere("email", "LIKE", `%${keyword}%`);

      return response.ok({ users });
    } catch (error) {
      return response.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
