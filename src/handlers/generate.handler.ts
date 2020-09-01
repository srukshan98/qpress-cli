import { GenerateConfigType, isGeneratableType, isModuleType, isControllerType, isMiddlewareType, GenerateType } from './../types/generate-config.type';
import { Handler } from './handler';
import { red, blue, green } from 'kleur';
import fs from 'fs';
import { threadId } from 'worker_threads';

export class GenerateHandler extends Handler {

    insertPath: string = '';
    fileName: string = '';
    className: string = '';
    basePath: string = '';
    folderName: string = '';
    generateType: GenerateType = GenerateType.module;

    constructor(private config: GenerateConfigType) {
        super();
    }
    init(): void {
        this.validateTypes();
        this.validateAndSetPaths();
        this.setSimpleName();
    }

    setSimpleName(): void {
        let name = this.config.name.trim();
        if (name == '') {
            console.error(red('Empty Name Error: Name Cannot be empty'));
            process.exit(0)
        }
        if (!name.match(/^[A-Za-z._]+$/)) {
            console.error(red('Name Format Error: Name Can only consist of Letters'));
            process.exit(0)
        }

        name = name.replace(/([A-Z])/g, '_$1').trim()
        if (name[0] == '_') name = name.substring(1);

        name = name.toLowerCase();
        name = name.split('.')[0];
        if (name.match(/module$/)) {
            name = name.substring(0, name.length - 6);
        }
        if (name.match(/component$/)) {
            name = name.substring(0, name.length - 6);
        }
        if (name.match(/middleware$/)) {
            name = name.substring(0, name.length - 6);
        }
        
        if (name[name.length - 1] == '_') name = name.substring(0,name.length - 1);

        this.fileName = name;

        switch (this.generateType) {
            case GenerateType.module:
                this.fileName += '.module.ts';
                break;
            case GenerateType.controller:
                this.fileName += '.controller.ts';
                break;
            case GenerateType.middleware:
                this.fileName += '.middleware.ts';
                break;
        }

        this.folderName = name;

        name = name.replace('_', ' ');
        name = titleCase(name).replace(' ', '');

        this.className = name;


        switch (this.generateType) {
            case GenerateType.module:
                this.className += 'Module';
                break;
            case GenerateType.controller:
                this.className += 'Controller';
                break;
            case GenerateType.middleware:
                this.className += 'Middleware';
                break;
        }
    }
    validateAndSetPaths() {
        const currentPath: string = process.cwd() + this.getNamePath();
        this.updateBasePath(currentPath);
        this.insertPath = currentPath;
    }
    getNamePath(): string {
        let path: string = '';
        let name: string | undefined;

        let namePaths = this.config.name.split('\\');
        name = namePaths.pop();

        if (namePaths.length > 0) {
            if (name) this.config.name = name;

            return '\\' + namePaths.join('\\');
        }

        namePaths = this.config.name.split('/');
        name = namePaths.pop();

        if (namePaths.length > 0) {
            if (name) this.config.name = name;

            return '\\' + namePaths.join('\\');
        }

        return path;
    }
    private updateBasePath(currentPath: string): void {
        const baseUri: string | null = getBasePath(currentPath);

        if (baseUri === null) {
            console.error(red('Current Directory path is not inside a QPress Project'));
            process.exit(0);
        }

        this.basePath = baseUri;
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
        this.generateType = getGenerateType(this.config.type) || GenerateType.module;
    }

    get templatePath(): string {
        let tempName: string = '';
        switch (this.generateType) {
            case GenerateType.module:
                tempName += `
import { Module } from "@qpress/core";

@Module({
    controllers: [],
    imports: [],
    middlewares: [],
})
export class $name {
}`;
                break;
            case GenerateType.controller:
                tempName += `
import { Route, RequestMapping } from '@qpress/core';

@Route('$route')
export class $name {

    @RequestMapping()
    public ListAll(): any {
        return {
            Content: '$name is working',
        };
    }
}`;
                break;
            case GenerateType.middleware:
                tempName += `
import { Attachable, Middleware, QRequest, QResponse, NextFunction } from "@qpress/core";

@Attachable()
export class $name implements Middleware {
    middleware(request: QRequest, response: QResponse, next: NextFunction): void {
        console.log('$name is working');
        next();
    }
}`;
        }
        return tempName;
    }

    process(): void {
        let file: string = this.templatePath;

        file = file.replace(/\$name/g, this.className);
        file = file.replace(/\$route/g, this.folderName);
        
        const path = this.generateType == GenerateType.module ? (this.folderName + '/' + this.fileName) : this.fileName;
        writeFileSyncRecursive(path, file);
        console.info(green('File Generated Successfully'))
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

function titleCase(str: string) {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

function getGenerateType(type: any): GenerateType | null {
    if (isControllerType(type)) return GenerateType.controller;
    if (isMiddlewareType(type)) return GenerateType.middleware;
    if (isModuleType(type)) return GenerateType.module;
    return null;
}

function writeFileSyncRecursive(filename: string, content: string) {
    // -- normalize path separator to '/' instead of path.sep, 
    // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
    let filepath = filename.replace(/\\/g, '/');

    // -- preparation to allow absolute paths as well
    let root = '';
    if (filepath[0] === '/') {
        root = '/';
        filepath = filepath.slice(1);
    }
    else if (filepath[1] === ':') {
        root = filepath.slice(0, 3);   // c:\
        filepath = filepath.slice(3);
    }

    // -- create folders all the way down
    const folders = filepath.split('/').slice(0, -1);  // remove last item, file
    folders.reduce(
        (acc, folder) => {
            const folderPath = acc + folder + '/';
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            return folderPath
        },
        root // first 'acc', important
    );

    // -- write file
    fs.writeFileSync(root + filepath, content);
}