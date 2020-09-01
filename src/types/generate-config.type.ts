const stringLitArray = <L extends string>(arr: L[]) => arr;

const controllerType = stringLitArray(["controller", 'c']);
type ControllerType = (typeof controllerType)[number];


const moduleType = stringLitArray(["module", 'm']);
type ModuleType = (typeof moduleType)[number];


const middlewareType = stringLitArray(["middleware"]);
type MiddlewareType = (typeof middlewareType)[number];


const type = stringLitArray(["controller", 'c', "module", 'm', "middleware"]);
type Type = (typeof type)[number];

export type GenerateConfigType = {
    type: Type;
    name: string;
}

export const isGeneratableType  = (x: any): x is Type => type.includes(x);
export const isControllerType  = (x: any): x is ControllerType => controllerType.includes(x);
export const isModuleType  = (x: any): x is ModuleType => moduleType.includes(x);
export const isMiddlewareType  = (x: any): x is MiddlewareType => middlewareType.includes(x);