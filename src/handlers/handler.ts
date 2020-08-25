import { NewConfigType } from '../types/new-config.type';
import figlet from 'figlet';
import { blue } from 'kleur';
export abstract class Handler {
    constructor() {
        this.printLogo();
    }

    private printLogo() {
        console.clear();
        console.log(blue(figlet.textSync('QPress', { horizontalLayout: 'full' })));
    }

    abstract init(): void;
    abstract process(): void;
}
