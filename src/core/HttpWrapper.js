var CommonUtil = require('../core/CommonUtil')

/**
 * request 包装
 */
var HttpWrapper = function () {}
HttpWrapper.wrapReqParams = function (req, obj) {
  if (obj != null && obj !== undefined) {
    if (typeof (obj) === 'object') {
      var params = CommonUtil.isObjEmpty(req.query) ? req.body : req.query
      for (var p in obj) {
        if (params[p] !== undefined) { obj[p] = params[p] }
      }
      return obj
    }
  } else {
    return CommonUtil.isObjEmpty(req.query) ? req.body : req.query
  }
}

/**
 * 包装返回参数；重复的参数将覆盖；
 * obj类型错误，并不会抛出异常
 */
HttpWrapper.wrapRenderParams = function (renderParams, obj) {
  if (!CommonUtil.isObjEmpty(obj)) {
    for (var p in obj)renderParams[p] = obj[p]
  }
  return renderParams
}
