import express from "express";
const router = express.Router();
router.get("/", (req,res)=>res.json([{from:"Cliente",text:"Teste PRO"}]));
export default router;
