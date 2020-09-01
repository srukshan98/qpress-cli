import { GenerateConfigType } from './../types/generate-config.type';
import { Options } from "yargs";
import { GenerateHandler } from '../handlers/generate.handler';

module.exports = {
    command: 'g <type> <name>',
    describe: 'Generate a new Quick Express Module, Controller, Middleware, etc',
    handler: (args: GenerateConfigType): void => {
        const handler = new GenerateHandler(args);

        handler.init();

        handler.process();
    }
} as Options
