import { Router } from "express";
import { Result } from "../models/m_result";
import { studioAgent } from "../agents/a_studio";
import { Studio } from "../models/m_studio";

export const studioRoute = Router();

const path = '/studio';

//GET ALL STUDIOS
studioRoute.route(path).get(async (req, res, next) => {
    const result = await studioAgent.getAllStudios();
    res.status(result.code).json(result.data);
});

//GET SINGLE STUDIO
studioRoute.route(path + '/:id').get(async (req, res, next) => {
    const id = req.params.id;
    const result: Result = await studioAgent.getStudioSingle(id);
    res.status(result.code).json(result.data);
});

//CREATE STUDIO
studioRoute.route(path).post(async (req, res, next) => {
    const newStu: Studio = req.body as Studio;
    const result = await studioAgent.createStudio(newStu);
    res.status(result.code).json(result.data);
});

//DELETE STUDIO
studioRoute.route(path + '/:id').delete(async (req, res, next) => {
    const id = req.params.id;
    const result = await studioAgent.deleteStudio(id);
    res.status(result.code).json(result.data);
});

//PUT STUDIO
studioRoute.route(path + '/:id').put(async (req, res, next) => {
    const id = req.params.id;
    const stu: Studio = req.body as Studio;
    const result = await studioAgent.updateStudio(id, stu);
    res.status(result.code).json(result.data);
});
