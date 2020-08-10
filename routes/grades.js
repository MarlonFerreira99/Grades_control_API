import express from 'express';
import { 
          insertGrade, getGrade, getIdGrade, 
          putGrade, deleteGrade, totalGrade, 
          averageGrade, threeBestGrade 
        } from '../controllers/gradesControllers.js';        

const router = express.Router();

router.post("/", async (req, res) => {
  res.send(await insertGrade(req.body));
});

router.put("/", async (req, res) => {
  res.send(await putGrade(req.body));
});

router.get("/", async (req, res) => {
  res.send(await getGrade());
});

router.get("/:id", getIdGrade);

router.delete("/:id", deleteGrade);

router.get("/totalGrade/:student/:subject", totalGrade);

router.get("/averageGrade/:subject/:type", averageGrade);

router.get("/threeBestGrade/:subject/:type", threeBestGrade);


export default router;