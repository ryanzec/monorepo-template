#Monorepo Template

This is an experiment for a super simple, no to low magic solution for a monorepo setup (multiple application / packages in a single repository). I would think of this as more a template for one possible way to structure a monorepo but I don't intend to add much automation of things (as stuff pops up I am add some simple scripts but I am going to avoid that as much as possible).

You probably should not use this but ¯\\\_(ツ)_/¯

# What Is Included

The following is includes:

- Yarn Zero-Installs
- TypeScript (w/ Babel)
- Auto Code Formatting
- Webpack
- Storybook
- ESLint
- Jest
- Cypress (for storybook component testing)
- Example Application
  - Axios
  - Emotion CSS
  - Font Awesome Icons
  - Immer
  - Inter Font
  - Lodash
  - React
  - React DnD
  - React Hook Form
  - React Router
  - Zod (data validation)
- .nvmrc
- 

# Setup Documentation

These are the follow steps to setup this monorepo template.

**NOTE: In order to simulate a login setup which I wanted to provide here, I am using Auth0 since it seemed relatively simple and has a free plan. You can modify the `packges/contexts/authentication.ts` file and associated usage fo it to provide your own authentication if you prefer.**

## Tools You Need

- Node: Recommend NVM (https://github.com/nvm-sh/nvm#installing-and-updating)

## Running Locally

- run `yarn`
- copy `.evn-template` to `.env` and fill in values
- copy `applications/web/src/index.html-template` to `applications/web/src/index.html` and fill in values
- run `yarn start:api` and `yarn start:web`

Your should have a local version of the example application running, if you setup the Auth0 configuration, logging in should also work.
