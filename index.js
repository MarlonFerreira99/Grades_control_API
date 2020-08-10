import express from 'express';
import { promises, read } from 'fs';
import gradesRouter from './routes/grades.js';

const { writeFile, readFile } = promises;

global.fileName = "grades.json"

const app = express();
app.use(express.json());
app.use("/grades", gradesRouter);


app.listen(3010, async () => {
    try {
      await readFile(global.fileName);
      console.log("API Started")
    } catch (err) {
        const initialJson = {
          nextId: 1,
          grades: []
        }
        writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
          console.log("API Started and File Created!");
        }).catch(err => {
          console.log(err);
        });
    }
});