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


#### Please Make sure the parent app module is importing the generated asset as it is a manual process - Further Enhancement Idea