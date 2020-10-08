import { execSync } from 'child_process';
import { Handler } from './handler';

export class ServeHandler extends Handler {
    init(): void {
        this.updateBasePath();
    }
    process(): void {
        this.runStart();
    }
    runStart() {
        execSync('npm start', { stdio: 'inherit' });
    }
    
}