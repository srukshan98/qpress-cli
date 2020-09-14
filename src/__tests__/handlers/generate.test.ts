import { GenerateType } from './../../types/generate-config.type';
import { GenerateHandler } from './../../handlers/generate.handler';
import { Handler } from '../../handlers/handler';
describe('Generate Command', () => {
    let mHandler: GenerateHandler;
    let cHandler: GenerateHandler;
    let mdHandler: GenerateHandler;
    beforeEach(() => {
        mHandler = new GenerateHandler({
            name: 'blog',
            type: "module"
        });
        cHandler = new GenerateHandler({
            name: 'blog',
            type: "c"
        });
        mdHandler = new GenerateHandler({
            name: 'time',
            type: "middleware"
        });
    })
    it('initialize', () => {
        expect(GenerateHandler).toBeDefined();
        expect(mHandler).toBeDefined();
        expect(cHandler).toBeDefined();
        expect(mdHandler).toBeDefined();
    })

    it('initialize Module', () => {
        mHandler.validateTypes();
        expect(mHandler.generateType).toBe(GenerateType.module);
    })

    it('initialize Controller', () => {
        cHandler.validateTypes();
        expect(cHandler.generateType).toBe(GenerateType.controller);
    })

    it('initialize Middleware', () => {
        mdHandler.validateTypes();
        expect(mdHandler.generateType).toBe(GenerateType.middleware);
    })
})