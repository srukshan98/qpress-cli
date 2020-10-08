import { InstallHandler } from './../handlers/install.handler';
import { Options } from "yargs";

module.exports = {
    command: 'install',
    describe: 'Install QPress NPM Packages',
    handler: (): void => {
        const handler = new InstallHandler();

        handler.init();

        handler.process();
    }
} as Options
