const Router = require('express/lib/router/index')
const Route = require('express/lib/router/route')

function decorateRouter (method, path, ...handlers) {
  if (!this[method]) throw new Error(`Invalid Router method '${method}'`)
  return this[method](path, ...handlers.map(decorateHandlers))
}

Router.safe = decorateRouter
Route.prototype.safe = decorateRouter

function decorateHandlers (handler) {
  const isArray = Array.isArray(handler)
  const isErrorHandler = !isArray && handler.length > 3

  if (isArray) {
    return handler.map(decorateHandlers)
  }
  if (isErrorHandler) {
    return handler
  }

  return async function (req, res, next) {
    try {
      await handler(...arguments)
    } catch (error) {
      next(error)
    }
  }
}
