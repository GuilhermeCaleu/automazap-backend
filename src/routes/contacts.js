import express from "express";
const router = express.Router();
router.get("/", (req,res)=>res.json([{name:"Teste",number:"5511999999"}]));
export default router;
