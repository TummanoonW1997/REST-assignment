import {Router} from 'express';
import {userRoute} from './r_user';
import {studioRoute} from './r_studio';
import {chapterRoute} from './r_chapter';
import {animeRoute} from './r_anime';

export const routes = Router();

routes.use(userRoute);
routes.use(studioRoute);
routes.use(chapterRoute);
routes.use(animeRoute);