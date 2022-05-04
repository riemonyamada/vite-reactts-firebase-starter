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

### update tsconfig

```shell
npm install --save-dev @tsconfig/strictest
```

- add `"extends": "@tsconfig/strictest/tsconfig.json"` to tsconfig

### configure alias

- update some files to set alias `@src`

### update sample pages

- update App.tsx and sample pages using router

### add Sentry

```shell
npm install --save @sentry/react @sentry/tracing
```

- add `ErrorBoundary`
- configure Sentry with env variables
- add hooks

### add plugin to upload source map files to Sentry

```shell
npm install vite-plugin-sentry
```

- configure `vite-plugin-sentry` with env variables

### add pre commit linting

```shell
npx mrm@2 lint-staged
```

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

### add authentication and router guard

- add `useAuth` for authentication
- add `SignIn`,`SingOut`,`ProtectedLayout` components
- add router guard based on the auth state
- add some extra components for demonstration

### add stacked notifications snackbar

```shell
npm i nanoid
```

- add `useAppNotification` hooks and `StackedSnackbar` component
- update `AppRoutes` to include `StackedSnackbar`
- update displays for auth errors

### init firebase

```shell
firebase init
```

- follow the guide

### add pwa plugin

```shell
npm i vite-plugin-pwa -D
```

- add assets
- add manifest and other options to `vite.config.ts`
- update `index.html`
- create `ReloadPrompt` component and inject it to `App`

### add firebase emulators

- update firebase config

### add i18next

```
npm install react-i18next i18next
npm install i18next-browser-languagedetector
npm install --save-dev i18next-parser
```

- add an i18next initialize function and types
- add a npm script and `i18next-parser.config.js` to extract translations
- update translations files

### add react-hook-form

```
npm install react-hook-form
```

- update `SigninForm.tsx`

### update to React18

```
npm install react@18 react-dom@18
npm install --save-dev @types/react@18 @types/react-dom@18
```

- update `main.tsx`
