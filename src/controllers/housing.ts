import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Queue from 'bull';
import { InternalServerError, NotFoundError } from '../errors/index';
import House from '../models/housing';
import {envVars} from '../constants'

const csvQueue=new Queue('csv',{
  redis:{
      port:envVars.REDISPORT,
      host:envVars.REDISHOST,
      password:envVars.REDISPASSWORD
  }
})




export const getAll = async (req: Request, res: Response,next:any)=> {
    try {
      const allHouses = await House.findAll();
      return res.status(StatusCodes.OK).json({ allHouses });
    } catch (error) {
      next(new InternalServerError('Unable to get all houses details'));
    }
  };
  


export const getOne = async (req: Request, res: Response,next:any) => {
    try {
      const house = await House.findByPk(req.params.id);
      if (!house) {
        next(new NotFoundError(`House with id ${req.params.id} not found`));
      }
      return res.status(StatusCodes.OK).json({ house });
    } catch (error) {
      next(new InternalServerError('Unable to get the house detail'));
    }
  };


export const createOne = async (req: Request, res: Response,next:any) => {
    try {
      console.log('house',req.body)
      const houseModel = {
        houseAddress: req.body['House Address'],
        noOfBedrooms: req.body['No of bedrooms'],
        noOfBathrooms: req.body['No of bathrooms'],
        yearBuilt: req.body['Year Built'],
        houseType: req.body['House Type'],
      };
  
      console.log('this is houseModel',houseModel)
      const house = await House.create(houseModel);
      return res.status(StatusCodes.OK).json({ msg: 'Successfully created house' });
    } catch (error) {
      next(new InternalServerError('Unable to add the house details'));
    }
  };
  

  export const uploadFile = async (req: Request, res: Response,next:any) => {
    try {
      const csvFile = req.file;
      const job = await csvQueue.add({ csvFile });
      return res
        .status(StatusCodes.OK)
        .json({ msg: `file uploaded successsfully and job running at ${job.id}` });
    } catch (error) {
      next(new InternalServerError('File upload failed'));
    }
  };
  


export const updateOne = async (req: Request, res: Response,next:any) => {
      try {
        console.log(req.body)
        const HOUSE_MODEL = {
          houseAddress: req.body['House Address'],
          noOfBedrooms: req.body['No of bedrooms'],
          noOfBathrooms: req.body['No of bathrooms'],
          yearBuilt: req.body['Year Built'],
          houseType: req.body['House Type'],
        };
    
        await House.update(HOUSE_MODEL, { where: { id: req.params.id } });
        return res.status(StatusCodes.OK).json({ msg: `Successfully updated details of house ${req.params.id}` });
      } catch (error) {
        next(new InternalServerError('Unable to update the house details'));
      }
  };

export const deleteOne=async(req:Request,res:Response,next:any) =>{
    try {
        await House.destroy({where:{id:req.params.id}})
        return res.status(StatusCodes.OK).json({msg:`Successfully updated details of house`})
    } catch (error) {
        next(new InternalServerError("Unable to remove the house details"))
    }
}

export const getJobStatus= async (req:Request, res:Response,next:any) => {
    const job = await csvQueue.getJob(req.params.id)
    if (!job) {
        next(new NotFoundError("Unable to find the job"))
    } else {
      const state = await job.getState()
      return res.status(StatusCodes.OK).json({ msg: `job ${job.id} is in ${state} state` })
    }
  };

