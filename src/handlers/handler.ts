import figlet from 'figlet';
import { blue, red } from 'kleur';
import fs from 'fs';


export abstract class Handler {
    basePath: string = '';
    constructor() {
        this.printLogo();
    }

    private printLogo() {
        console.clear();
        console.log(blue(figlet.textSync('QPress', { horizontalLayout: 'full' })));
    }

    abstract init(): void;
    abstract process(): void;

    protected updateBasePath(currentPath: string = process.cwd()): void {
        const baseUri: string | null = getBasePath(currentPath);

        if (baseUri === null) {
            console.error(red('Current Directory path is not inside a QPress Project'));
            process.exit(0);
        }

        this.basePath = baseUri;
    }
}

export function getBasePath(currentPath: string): string | null {
    if (fs.existsSync(currentPath + '\\.qpress')) {
        return currentPath;
    } else {
        const pathBlocks: string[] = currentPath.split('\\');
        pathBlocks.pop();
        if (pathBlocks.length > 0) {
            return getBasePath(pathBlocks.join('\\'));
        }
        return null;
    }
}