import { GenerateConfigType, isGeneratableType, isModuleType, isControllerType, isMiddlewareType } from './../types/generate-config.type';
import { Handler } from './handler';
import { red, blue } from 'kleur';
import fs from 'fs';

export class GenerateHandler extends Handler {

    insertPath: string = '';
    fileName: string = '';
    className: string = '';
    modulePath: string = '';

    constructor(private config: GenerateConfigType) {
        super();
    }
    init(): void {
        this.validateTypes();
        this.validateAndSetPaths();
    }
    validateAndSetPaths() {
        const currentPath: string = process.cwd();
        const baseUri: string | null = getBasePath(currentPath);

        if (baseUri === null) {
            console.error(red('Current Directory path is not inside a QPress Project'));
            process.exit(0);
        }

        // TODO: set Paths
    }
    private validateTypes() {
        if (!isGeneratableType(this.config.type)) {
            console.error(red('Generatable Type entered is Invalid'));
            console.info();
            console.info(blue('Try one of the following commands'));
            console.info(blue(' - To Generate a Module `m` or `module`'));
            console.info(blue(' - To Generate a Controller `c` or `controller`'));
            console.info(blue(' - To Generate a Middleware `middleware`'));
            process.exit(0);
        }
    }

    process(): void {
        // if (isModuleType(this.config.type)) {
        //     this.processModule();
        // } else if (isControllerType(this.config.type)) {
        //     this.processController();
        // } else if (isMiddlewareType(this.config.type)) {
        //     this.processMiddleware();
        // }
    }
    processMiddleware() {
        throw new Error("Method not implemented.");
    }
    processController() {
        throw new Error("Method not implemented.");
    }
    processModule() {
        throw new Error("Method not implemented.");
    }

}

function getBasePath(currentPath: string): string | null {
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