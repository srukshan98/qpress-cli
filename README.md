# Quick Express CLI Helper Package

## Introduction

This is an extension of @qpress/core. Can be used to easily generate qpress applications and assets inside.

## Installation

```
npm install -g @qpress/cli
```

## How to use

### Generate a new Application

Open a terminal in the projects directory and enter the command as below.

```
qpress new <<Application Name>> -m
```

This will generate a new application with the name given. The ```-m``` in this command can be added if a minimal application is required without sample data.

### Generate an Asset

Open a termial in the directory the you want to generate the asset and run the command as below.

```
qpress g <<type>> <<name>>
```

This will generate an asset in the given path.
The types are as belows,
  - To Generate a Module `m` or `module` ( Modules will be generated inside a folder named after the module automatically )
  - To Generate a Controller `c` or `controller`
  - To Generate a Provider `p` or `provider`
  - To Generate a Middleware `middleware`

### Run QPress Development Server

Open a terminal inside the project folder and un the command below.

```
qpress serve
```

This will run the dev server with auto-reload.

### Build QPress Server

Open a terminal inside the project folder and un the command below.

```
qpress build
```

This will compile and minify the QPress Server.


Generated Assets will be Auto-imported into the App Module


<p align="center">
	<a href="https://github.com/srukshan98"><img src="https://img.shields.io/github/followers/srukshan98.svg?label=GitHub&style=social" alt="GitHub"></a>
	<a href="https://twitter.com/srukshan98"><img src="https://img.shields.io/twitter/follow/srukshan98?label=Twitter&style=social" alt="Twitter"></a>
	<a href="https://www.linkedin.com/in/srukshan98"><img src="https://img.shields.io/badge/LinkedIn--_.svg?style=social&logo=linkedin" alt="LinkedIn"></a>
	<a href="https://www.patreon.com/srukshan98"><img src="https://img.shields.io/badge/Sponsors--_.svg?style=social&logo=github&logoColor=EA4AAA" alt="Sponsors"></a>
</p>
