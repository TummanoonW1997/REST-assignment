import { Router } from "express";
import { Result } from "../models/m_result";
import { animeAgent } from "../agents/a_anime";
import { Anime } from "../models/m_anime";

export const animeRoute = Router();

const path = '/anime';

//GET ALL ANIME
animeRoute.route(path).get(async (req, res, next) => {
    const result = await animeAgent.getAllAnimes();
    res.status(result.code).json(result.data);
});

//GET SINGLE ANIME
animeRoute.route(path + '/:id').get(async (req, res, next) => {
    const id = req.params.id;
    const result: Result = await animeAgent.getAnimeSingle(id);
    res.status(result.code).json(result.data);
});

//CREATE ANIME
animeRoute.route(path).post(async (req, res, next) => {
    const newStu: Anime = req.body as Anime;
    const result = await animeAgent.createAnime(newStu);
    res.status(result.code).json(result.data);
});

//DELETE ANIME
animeRoute.route(path + '/:id').delete(async (req, res, next) => {
    const id = req.params.id;
    const result = await animeAgent.deleteAnime(id);
    res.status(result.code).json(result.data);
});

//PUT ANIME
animeRoute.route(path + '/:id').put(async (req, res, next) => {
    const id = req.params.id;
    const stu: Anime = req.body as Anime;
    const result = await animeAgent.updateAnime(id, stu);
    res.status(result.code).json(result.data);
});
