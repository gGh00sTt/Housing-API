import express,{Express,Request,Response} from 'express'
import dotenv from 'dotenv'
import './processors/index'
import 'express-async-errors'
import sequelize from './util/database'
import { envVars } from './constants'

dotenv.config()
 
//swagger
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import {swaggerOptions} from './swaggerOptions'

//routers
import houseRouter from './routes/housing'
import authRouter from './routes/authentication'

//middleware
import authentication from './middlewares/authentication'

//errorhandler
import notFoundMiddleware from './middlewares/not-found'
import {errorHandlerMiddleware} from './middlewares/error-handler'


const app:Express=express()
const port=envVars.PORT || 8000
const swaggerDocs=swaggerJsDoc(swaggerOptions)

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true}))

app.use((req:Request,res:Response,next:any)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','*')
    next()
})


app.use("/api/auth",authRouter)
app.use("/api/house",authentication,houseRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)




const startserver=async()=>{
    try {
        await sequelize.sync({force:false})
        app.listen(port,()=>{
            console.log(`listening in ${envVars.SERVER_HOST}:${port} !`)
        })
    } catch (error) {
        console.log(error)
        
    }

}

startserver()