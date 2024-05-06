import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { StoreValidator, UpdateValidator } from "App/Validators/Post/Main";
import { User, Post } from "App/Models";

export default class PostsController {
  public async index({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
