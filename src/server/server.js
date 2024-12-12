import express from 'express'

import { corsMiddleware } from '../middlewares/cors.js'

import { router } from '../routes/server.routes.js'

import { applicationRouter } from '../routes/application.routes.js'

import { clientRouter } from '../routes/client.routes.js'

import { componentRouter } from '../routes/component.routes.js'

import { menuRouter } from '../routes/menu.routes.js'

import { metaDataRouter } from '../routes/metaData.routes.js'

import { tIComponentRouter } from '../routes/tIComponent.routes.js'

import logger from '../util/logger.js'

//Requiere Cors por funcion fetch desde React
//const cors = require('cors');
// Declaración de constante de tipo express
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
//app.use(cors());
app.use(corsMiddleware)

//
app.options('*', corsMiddleware)

//Routes
app.use('/', router)
app.use('/application', applicationRouter)
app.use('/client', clientRouter)
app.use('/component', componentRouter)
app.use('/menuApp', menuRouter)
app.use('/metaData', metaDataRouter)
app.use('/tIComponent', tIComponentRouter)

app.get('/healthCheck', function (req, res) {
  res.status(200).json({
    success: true,
    message: 'Service Running',
    branchName: process.env.BRANCH_NAME,
  })
})

app.listen(process.env.PORT || 80, () => {
  logger.info(`Listening Port: ${process.env.PORT || 80}`)
})
