
test('Has New Command', () => {
	expect(require('../commands/new').command).toBeDefined();
});

test('Has Generate Command', () => {
	expect(require('../commands/generate').command).toBeDefined();
});