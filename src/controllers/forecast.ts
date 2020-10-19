import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { authMiddleware } from '@src/middleware/auth';
import { Beach } from '@src/models/beaches';
import { Forecast } from '@src/services/forecast';
import { Request, Response } from 'express';
import { BaseController } from '.';

const forecast = new Forecast();

@Controller('forecast')
@ClassMiddleware(authMiddleware)
export class ForecastController extends BaseController {
    @Get('')
    public async getForecastForLoggerdUser(req: Request, res: Response): Promise<void> {
        try {
            const beaches = await Beach.find({user: req.decoded?.id});
            const forecastData = await forecast.processForecastForBeaches(beaches);
            res.status(200).send(forecastData);
        } catch(error) {
            this.sendErrorResponse(res, { code: 500, message: '' });
        }
    }
}
