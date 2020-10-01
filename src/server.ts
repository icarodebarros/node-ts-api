import { Server } from '@overnightjs/core';
import './util/module-alias';
import * as express from 'express';
import { ForecastController } from './controllers/forecast';
import * as database from '@src/database';

export class SetupServer extends Server {
    /*
    * same as this.port = port, declaring as private here will
    * add the port variable to the SetupServer instance
    */
    constructor(private port = 3000) {
        super();
    }

    /*
    * We use a different method to init instead of using the constructor
    * this way we allow the server to be used in tests and normal initialization
    */
    public async init(): Promise<void> {
        this.setupExpress();
        this.setupControllers();
        await this.databaseSetup();
    }

    public getApp(): express.Application {
        return this.app;
    }

    private setupExpress(): void {
        this.app.use(express.json());
    }

    private setupControllers(): void {
        const forecastController = new ForecastController();
        this.addControllers([forecastController]);
    }

    private async databaseSetup(): Promise<void> {
        await database.connect();
    }
    
    public async close(): Promise<void> {
        await database.close();
    }
}
