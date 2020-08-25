import { Options } from "yargs";
import { blue } from 'kleur';
import figlet from 'figlet';
import { newHandler } from '../handlers/new.handler';

module.exports = {
    builder: {
        minimal: {
            alias: 'm',
            type: 'boolean',
            default: false,
            describe: 'Generate a Minimalistic Project without the starter modules and middlewares'
        }
    },
    command: 'new <name>',
    describe: 'Generate a new Quick Express Project',
    handler: (args: { name: string, minimal: boolean; _: string[]; $0: string; }): void => {
        const handler = new newHandler(args);

        handler.init();

        handler.process();
    }
} as Options
