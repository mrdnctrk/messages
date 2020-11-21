const path = require('path')
const fs = require('fs')
const fsextra = require('fs-extra')
const IS_DEV = process.env.NODE_ENV === 'development'

const APP_ROOT_DIR = '/opt/app-root'
const serverDir = IS_DEV ? 'src' : 'server'
const swaggerUIDir = path.join(__dirname, 'site')
const swaggerJsonFile = path.join(__dirname, '..', serverDir, 'api', 'swagger.json')
const swaggerJson = require(swaggerJsonFile)


if (!IS_DEV) { 
  //customize swagger doc for production 
  //change scheme to https 
  swaggerJson.schemes = ['https']
  //make user headers non-required (which are injected by app framework on prod)
  swaggerJson.parameters.QRadarUser.required = false
  swaggerJson.parameters.QRadarUserRole.required = false
  swaggerJson.parameters.QRadarSecurityProfile.required = false
  //set the base path for the api
  swaggerJson.basePath = '/console/plugins/app_proxy:pulse'
  //write the customize swagger.json to swagger ui dir
  fs.writeFileSync(path.join(swaggerUIDir, 'swagger.json'), JSON.stringify(swaggerJson))
  //move swagger-ui front-end files to the app dir to serve them
  fsextra.ensureDirSync(`${APP_ROOT_DIR}/app/swagger-ui`)
  fsextra.copySync(swaggerUIDir, `${APP_ROOT_DIR}/app/swagger-ui`)
} else { 
  //for dev environment just copy the latest swagger.json to swagger UI dir
  fs.copyFileSync(swaggerJsonFile, path.join(swaggerUIDir, 'swagger.json'))
}






