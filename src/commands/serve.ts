import { ServeHandler } from './../handlers/serve.handler';
import { Options } from "yargs";

module.exports = {
    command: 'serve',
    describe: 'Run QPress Application with hot reload',
    handler: (): void => {
        const handler = new ServeHandler();

        handler.init();

        handler.process();
    }
} as Options
