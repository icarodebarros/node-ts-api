import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import logger from '@src/logger';
import { authMiddleware } from '@src/middleware/auth';
import { Beach } from '@src/models/beach';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('beaches')
@ClassMiddleware(authMiddleware)
export class BeachesController extends BaseController {
    @Post('')
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const beach = new Beach({...req.body, user: req.decoded?.id});
            const result = await beach.save();
            res.status(201).send(result);
        } catch (error) {
            logger.error(error);
            this.sendCreateUpdateErrorResponse(res, error);
        }
    }
}