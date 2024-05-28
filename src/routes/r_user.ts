import { Router } from "express";
import { CreateUserDto } from "../models/m_user";
import { userAgent } from '../agents/a_user';
import { Result } from "../models/m_result";

export const userRoute = Router();

const path = '/user';

//GET ALL USERS
userRoute.route(path).get(async (req, res, next) => {
    const result = await userAgent.getAllUsers();
    res.status(result.code).json(result.data);
});

//GET SINGLE USER
userRoute.route(path + '/:userId').get(async (req, res, next) => {
    const userId = req.params.userId;
    const result: Result = await userAgent.getUserSingle(userId);
    res.status(result.code).json(result.data);
});

//CREATE USER
userRoute.route(path).post(async (req, res, next) => {
    const userDto: CreateUserDto = req.body as CreateUserDto;
    const result = await userAgent.createUser(userDto);
    res.status(result.code).json(result.data);
});

//DELETE USER
userRoute.route(path + '/:id').delete(async (req, res, next) => {
    const id = req.params.id;
    const result = await userAgent.deleteUser(id);
    res.status(result.code).json(result.data);
});
