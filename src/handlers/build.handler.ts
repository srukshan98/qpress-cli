import { execSync } from 'child_process';
import { Handler } from './handler';

export class BuildHandler extends Handler {
    init(): void {
        this.updateBasePath();
    }
    process(): void {
        this.runStart();
    }
    runStart() {
        execSync('npm run build', { stdio: 'inherit' });
    }
    
}