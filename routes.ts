import {Context, Router, send} from './deps.ts'
import type {RouterContext, Application} from './deps.ts'
import {log} from './middleware.ts'
import userController from "./controllers/user-controller.ts";

// deno-lint-ignore no-explicit-any
const router: any = new Router()

router.get('/', ({params, response}: RouterContext<string>) => {
    log.debug('Serving hello world')
    response.body = 'Hello world!'
    })
    .get('/api/v1/users', userController.getUsers)
    .post('/api/v1/users', userController.createUser);

const init = (app: Application) => {
    app.use(router.routes())

    app.use(router.allowedMethods())
}

export default {
    init,
}
