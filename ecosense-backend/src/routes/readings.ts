import Express from 'express';
import {prisma} from '../db';
import {Reading}from '../types/index';

const router = Express.Router();

router.post('/',async (req,res)=>{
    const { sensor_id,temperature,humidity } = req.body as Reading;
    if (!sensor_id || temperature==undefined || humidity==undefined){
        return res.status(400).json({rror:'missing fields'});
    }

    try{  
        const newreadings= await prisma.reading.create({
    data:{
        sensor_id,
        temperature,
        humidity  },
    });
    return res.status(201).json(newreadings);
    
} catch (error){
    console.error('error saving readings', error);
    return res.status (500).json({error: 'inernal server error'})
    
}
});


// get 

router.get('/',async(req,res)=>{
    try{
        const readings= await prisma.reading.findMany({
            orderBy:{
                timestamp:'desc',
            },
        })
        return res.status(200).json(readings);
    }
    catch (error){
        console.error('error fitching data:',error );
        return res.status(500).json({error:'server error'});
    }
})

export default router; 