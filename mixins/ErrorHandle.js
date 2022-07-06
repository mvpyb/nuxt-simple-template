
/**
 * 自定义错误处理
 * @param {*} context
 * @param {*} error
 */
const errorHandler = ( ContextError, error ) => {
  if ( error ) {
    switch ( error.statusCode ) {
      case 401:
        ContextError( {
          statusCode : 401,
          message : 'You need back to login again'
        } )
        break
      case 500:
        ContextError( {
          statusCode : 500,
          message : 'it\'s a innner wrong'
        } )
        break
      default:
        ContextError( {
          statusCode : 100,
          message : 'unknown error'
        } )
        break
    }
  }
}

export default errorHandler
