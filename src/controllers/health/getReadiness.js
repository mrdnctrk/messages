async function getReadiness(req, res, next) {
  try {
    return res.status(200).json({isReady:true})
  }
  catch(e) {
    next(e)
  }

}

module.exports = getReadiness