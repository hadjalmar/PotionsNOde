const express = require("express")
const{eq}=require("drizzle-orm");
const db = require("../db/db");
const { potions } = require("../db/schema");
const app = express();
const router = express.Router();

router.get("/api/potions",async(req,res)=>{
    try{
        const allpotions= await db.select().from(potions);
        return res.status(200).json(allpotions);
    }
    catch(err){
        return res.status(500).json({err:err.message})
    }
})
module.exports(router)