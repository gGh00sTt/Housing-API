import fs from 'fs'
import csv from 'csv-parser'
import House from '../models/housing'

const housingDataProcessor=(job:any,done:any)=>{
    try {
        fs.createReadStream(job.data.csvFile.path).pipe(csv()).on('data',async(row)=>{
            const HOUSE_MODEL={
                houseAddress:row['House Address'],
                noOfBedrooms:row['No of bedrooms'],
                noOfBathrooms:row['No of bathrooms'],
                yearBuilt:row['Year Built'],
                houseType:row['House Type']
             }
            await House.create(HOUSE_MODEL)
        })
    
    setTimeout(()=>{
        done()
    },4000)

        
    } catch (error) {
        console.log(error)
        
    }
    
}


export default housingDataProcessor