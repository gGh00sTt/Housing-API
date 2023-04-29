import Queue from 'bull'
import path from 'path'
import { envVars } from '../constants'

const csvQueue=new Queue('csv',{
    redis:{
        port:envVars.REDISPORT,
        host:envVars.REDISHOST,
        password:envVars.REDISPASSWORD
    }
  })
  
csvQueue.process(path.join(__dirname,'housingDataProcessor.js'))

csvQueue.on('completed',(job)=>{
    console.log(`Completed ${job.id}`)
})


