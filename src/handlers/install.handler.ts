import { execSync } from 'child_process';
import { Handler } from './handler';

export class InstallHandler extends Handler {
    init(): void {
        this.updateBasePath();
    }
    process(): void {
        this.runStart();
    }
    runStart() {
        execSync('npm install', { stdio: 'inherit' });
    }
    
}