import { Router } from "express";
import { chapterAgent } from "../agents/a_chapter";
import { Result } from "../models/m_result";
import { Chapter } from "../models/m_chapter";

export const chapterRoute = Router();

const path = '/chapter';

//GET ALL CHAPTERS
chapterRoute.route(path).get(async (req, res, next) => {
    const result = await chapterAgent.getAllChapters();
    res.status(result.code).json(result.data);
});

//GET SINGLE CHAPTER
chapterRoute.route(path + '/:id').get(async (req, res, next) => {
    const id = req.params.id;
    const result: Result = await chapterAgent.getChapterSingle(id);
    res.status(result.code).json(result.data);
});

//CREATE CHAPTER
chapterRoute.route(path).post(async (req, res, next) => {
    const newChapt: Chapter = req.body as Chapter;
    const result = await chapterAgent.createChapter(newChapt);
    res.status(result.code).json(result.data);
});

//DELETE CHAPTER
chapterRoute.route(path + '/:id').delete(async (req, res, next) => {
    const id = req.params.id;
    const result = await chapterAgent.deleteChapter(id);
    res.status(result.code).json(result.data);
});

//PUT CHAPTER
chapterRoute.route(path + '/:id').put(async (req, res, next) => {
    const id = req.params.id;
    const chapt: Chapter = req.body as Chapter;
    const result = await chapterAgent.updateChapter(id, chapt);
    res.status(result.code).json(result.data);
});
