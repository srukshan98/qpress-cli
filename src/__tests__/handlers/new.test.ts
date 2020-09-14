import { newHandler } from './../../handlers/new.handler';
import { Handler } from '../../handlers/handler';
test('Has New Handler', () => {
    expect(newHandler).toBeDefined();
})

test('New Handler Initialize', () => {
    const handler: newHandler = new newHandler({
        name: 'NewProject',
        minimal: false
    });
    handler.init();

    expect(handler).toBeInstanceOf(Handler);
})

test('New Handler Name Check', () => {
    let handler: newHandler = new newHandler({
        name: 'NewProject',
        minimal: false
    });
    
    expect(handler.getProjectName()).toBe('newproject')

    handler = new newHandler({
        name: 'New-Project',
        minimal: false
    });
    
    expect(handler.getProjectName()).toBe('new-project')
})