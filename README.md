# Vite React Firebase Jotai Starter

## Feature

A quick start project template powered by vite which includes below:

- Vite
- React
- TypeScript
- ESlint (airbnb)
- Prettier
- MUI
- React Router
- Sentry
- Firebase
- Jotai
- rollup-plugin-visualizer

## Getting Started

Clone the repo and `npm install`

## How to create this starter

This is for your reference.

### create project using vite

```shell
npm create vite@latest
✔ Project name: … react-template
✔ Select a framework: › react
✔ Select a variant: › react-ts
```

```shell
cd vite-template
npm install
```

### init ESlint

```shell
npm install eslint --save-dev
npm init @eslint/config
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
✔ Would you like to install them now with npm? · Yes
```

### configure ESlint

```shell
npm install eslint-config-airbnb-typescript
```

- update `.eslintrc.js` and `tsconfig.node.json`
- add a npm script for `eslint --fix`

### int and configure Prettier

```shell
npm install --save-dev --save-exact prettier
```

- add `.prettierrc.js` and `.prettierignore`
- add a npm script for `prettier --write`

### lint

- add a npm script to lint
- lint some files

### init MUI

```shell
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/lab
```

- add `theme.ts`

### configure emotion

- update some files to make components use css property

### update font-family

- update index.html and theme.ts to add `Noto Sans JP`

### install React Router v6

```shell
npm install react-router-dom@6
```

### update noUncheckedIndexedAccess on tsconfig

- add `"noUncheckedIndexedAccess": true` to tsconfig

### configure alias

- update some files to set alias `@src`

### update sample pages

- update App.tsx and sample pages using router

### add pre-commit

```shell
npm install --save-dev pre-commit
```

update `package.json`

### add Sentry

```shell
npm install --save @sentry/react @sentry/tracing
npm install react-router-v6-instrumentation
```

- add `ErrorBoundary`
- configure Sentry with env variables
- add hooks

### add plugin to upload source map files to Sentry

```shell
npm install vite-plugin-sentry
```

- configure `vite-plugin-sentry` with env variables

### update pre commit linting strategy

```shell
npm uninstall pre-commit
npx mrm@2 lint-staged
```

- remove `pre-commit` entry from `package.json`
- update `lint-staged` entry in `package.json`

### add Firebase

```shell
npm install firebase
```

- add initialization functions with env variables
- add hooks

### add rollup-plugin-visualizer

```shell
npm install --save-dev rollup-plugin-visualizer
```

- configure `vite.config.ts`

### add Jotai

```shell
npm install jotai
```
