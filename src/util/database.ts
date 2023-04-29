import {Sequelize} from 'sequelize'
import { envVars } from '../constants'

const sequelize= new Sequelize(
    envVars.PGDATABASE,
    envVars.PGUSER,
    envVars.PGPASSWORD,
    {
        host:envVars.PGHOST,
        dialect: 'postgres'
    }
)

export default sequelize