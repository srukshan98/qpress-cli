import { ErrorCodeType } from './../types/error-code.type';
import { NewConfigType } from './../types/new-config.type';
import { Handler } from './handler';
import { execSync } from 'child_process';
import { red, green } from 'kleur';
import * as config from '../config.json';
import fs from 'fs';
export class newHandler extends Handler {
    constructor(private args: NewConfigType) {
        super();
    }

    public init() {
        console.log('Generating Application', this.args.name, 'in ', this.args.minimal ? 'minimal' : 'non-minimal', 'mode');
    }
    getProjectName() {
        const name = this.args.name.toLowerCase();
        const nameMatch = String(name).match('^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$');
        if (nameMatch == null || nameMatch.length === 0) {
            console.log(red(`( ${ErrorCodeType.ProjectNameError} ) Error: Please make sure the project name is having no spaces and retry.`))
            process.exit(1)
        }
        return name;
    }

    process() {
        this.checkGit();
        this.cloneRepo();
        this.updatePackage();
        this.installPackages();
        console.log(green('Your Project has been successfully Generated'));
    }
    installPackages() {
        try {
            execSync(`cd ${this.args.name} && npm install`);
        } catch(e) {
            console.log(red(`( ${ErrorCodeType.InstallError} ) Error: Something went wrong. Please retry.`))
        }
    }
    updatePackage() {
        const pkgname = this.getProjectName();

        const pkg = JSON.parse(fs.readFileSync(`${this.args.name}/package.json`, "utf-8"))
        pkg.name = pkgname;
        pkg.version = '0.0.1';
        delete pkg.author;
        delete pkg.description;
        fs.writeFileSync(`${this.args.name}/package.json`,JSON.stringify(pkg, null, "\t"));
        
        try {
            const pkglk = JSON.parse(fs.readFileSync(`${this.args.name}/package-lock.json`, "utf-8"))
            pkglk.name = pkgname;
            pkglk.version = '0.0.1';
            delete pkglk.author;
            delete pkglk.description;
            fs.writeFileSync(`${this.args.name}/package-lock.json`,JSON.stringify(pkglk, null, "\t"));
        } catch (e) {}
    }
    cloneRepo() {
        try {
            execSync(`git clone ${this.args.minimal ? config.git.cloneMinimalUrl : config.git.cloneUrl} ${this.args.name} && cd ${this.args.name} && rmdir /Q /S .git && git init`, { stdio: 'pipe' });
        } catch(e) {
            console.log(red(`( ${ErrorCodeType.GitCloneError} ) Error: Something went wrong. Please retry.`))
            process.exit(1)
        }
    }

    private checkGit() {
        try {
            execSync('[ -d .git ] && echo .git || git rev-parse --git-dir > /dev/null 2>&1', { stdio: 'pipe' });
            console.log(red('Error: Git Repository Already Iniialised'));
            process.exit(1)
        }
        catch (e) {
        }
    }
}
