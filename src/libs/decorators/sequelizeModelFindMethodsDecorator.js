const errorsFactory = require('http-errors')
const NotFoundError = new errorsFactory.NotFound()

module.exports = function (model) {
  model.findByIdOrError = async function (id, options) {
    let error = getErrorFromOptions(options)

    const result = await this.findById(id, options)
    if (!result) throwError(error)
    return result
  }

  model.findOneOrError = async function (options) {
    let error = getErrorFromOptions(options)

    const result = await this.findOne(options)
    if (!result) throwError(error)
    return result
  }

  model.throwErrorIfExist = async function (options) {
    let error = getErrorFromOptions(options)

    const result = await this.findOne(options)
    if (result) throwError(error)
  }
}

function throwError (error) {
  throw (error || NotFoundError)
}

function getErrorFromOptions (options) {
  let error = null

  if (options && options.error) {
    error = options.error
    delete options.error
  }

  return error
}
