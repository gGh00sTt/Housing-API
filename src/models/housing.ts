import sequelize from 'sequelize'
import db from '../util/database'

const House=db.define('houses',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    houseAddress:{
        type:sequelize.STRING,
        allowNull:false
    },
    noOfBedrooms:{
        type:sequelize.INTEGER,
        allowNull:true
    },
    noOfBathrooms:{
        type:sequelize.INTEGER,
        allowNull:true
    },
    yearBuilt:{
        type:sequelize.INTEGER,
        allowNull:true
    },
    houseType:{
        type:sequelize.STRING,
        allowNull:true
    }
})

export default House