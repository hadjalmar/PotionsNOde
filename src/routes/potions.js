const express = require("express")
const{eq}=require("drizzle-orm");
const db = require("../db/db");
const { potions } = require("../db/schema");
const renderErrorHandler = require("../utilities/renderErrorHandler");
const app = express();
const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const allpotions= await db.select().from(potions);
        return res.status(200).json(allpotions);
    }
    catch(err){
        return res.status(500).json({err:err.message})
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
router.post("/",async(req,res)=>{
    try{
        const {name,effect,IsDangeorus} = req.body
        if(!name){
            return res.status(404).json({message:"cnuc name"})
        }
        if(!effect){
            return res.status(404).json({message:"cnuc effect"})
        }
        if(IsDangeorus === undefined){
            return res.status(404).json({message:"cnuc IsDangeorus"})
        }
        await db.insert(potion).values({
            name:name,
            effect:effect,
            IsDangeorus:IsDangeorus
        })
        return res.status(201).json({message:"farok matyi"})
    }
    catch(err){
        renderErrorHandler(res,err)
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
router.delete("/:id",async(req,res)=>{
    try{
        const [entry] = await db.select().from(potions).where(eq(potions.id,+req.params.id))
        if(!entry){
            return res.status(404).json({
                message:"rotty kuruttyoló"
            })
        }
        await db.delete(potion).where(eq(potions.id,+req.params.id))
        return res.status(200).json(entry);
    }
    catch(err){
        return renderErrorHandler(res,err)
    }
})
router.put("/:id",async(req,res)=>{
    try{
        const {name,effect,IsDangeorus}=req.body;
        const [updating] = await db.select().from(potions).where(eq(potions.id,req.params.id))
        if(!updating){
            return res.status(404).json({
                message:"nincs ilyen"
            });
        }
        await db.update(potion).set({name,effect,IsDangeorus}).where(eq(potions.id,req.params.id))
        return res.status(200).json({
            message:"sikires recska"
        });
        }
    catch(err){
       return renderErrorHandler(res,err)
    }
})
module.exports = router