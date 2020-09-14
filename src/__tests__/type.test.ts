import { isModuleType, isControllerType, isMiddlewareType, isGeneratableType } from './../types/generate-config.type';

test('Type Check', () => {
    expect(isGeneratableType('module')).toBe(true);
    expect(isGeneratableType('c')).toBe(true);
    expect(isGeneratableType('middleware')).toBe(true);
    expect(isGeneratableType('mid')).toBe(false);
})

test('Module Type Check', () => {
    expect(isModuleType('module')).toBe(true);
    expect(isModuleType('m')).toBe(true);
    expect(isModuleType('mod')).toBe(false);
})

test('Controller Type Check', () => {
    expect(isControllerType('controller')).toBe(true);
    expect(isControllerType('c')).toBe(true);
    expect(isControllerType('con')).toBe(false);
})

test('Middleware Type Check', () => {
    expect(isMiddlewareType('middleware')).toBe(true);
    expect(isMiddlewareType('m')).toBe(false);
})