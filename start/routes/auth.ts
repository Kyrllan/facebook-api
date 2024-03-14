import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/http/auth/auth_controller')

router
  .group(() => {
    router.post('/login', [AuthController, 'store'])
    router.delete('/logout', [AuthController, 'destroy'])
  })
  .prefix('/auth')
