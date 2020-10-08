import { BuildHandler } from './../handlers/build.handler';
import { Options } from "yargs";

module.exports = {
    command: 'build',
    describe: 'Build QPress Application',
    handler: (): void => {
        const handler = new BuildHandler();

        handler.init();

        handler.process();
    }
} as Options
