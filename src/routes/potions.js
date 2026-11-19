const express = require("express")
const{eq}=require("drizzle-orm");
const db = require("../db/db");
const { potions } = require("../db/schema");
const app = express();
const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const allpotions= await db.select().from(potions);
        return res.status(200).json(allpotions);
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
})

router.get("/:id",async(req,res)=>{
    try{
        const[entry] = await db.select().from(potions).where(eq(potions.id,+req.params.id));
        if(!entry){
            return res.status(404).json({
                message:"rotty puruty"
            })
        }
        return res.status(200).json(entry);
    }
    catch(err){
        renderErrorHandler(res,err)
    }
})
module.exports = router