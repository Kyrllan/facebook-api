import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth/index'
import User from '#models/user'

export default class AuthController {
  async store({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  async destroy({ auth, response }: HttpContext) {
    const getUser = await User.findByOrFail('id', auth.user!.id)
    await getUser.delete()
    return response.ok({ message: 'User deleted' })
  }
}
