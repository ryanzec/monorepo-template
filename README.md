#Monorepo Template

This is an experiment for a super simple, low to no blackbox solution for a monorepo setup (multiple application / packages in a single repository). I would think of this as more a template for one possible way to structure a monorepo. I might update this from time to time with new library updates or just random things I want to try.

There is currently no intent in supporting this in any kind of standard open source way, this code is just provided as is and that is that.

Maybe you shouldn't use this but maybe it will be useful to someone for some reason ¯\\\_(ツ)_/¯

# What Is Included

The following is includes:

- Vite
- TypeScript (w/ Babel)
- Storybook
- ESLint
- Cypress (setup for component testing)
- Mocha / Chai / Sinon Unit Testing
- Auto Code Formatting
- Example Application
  - Axios
  - Emotion Styling
  - Font Awesome Icons
  - Immer (data immutability)
  - Inter Font
  - Lodash
  - React
  - React DnD
  - React Hook Form
  - React Router
  - Zod (data validation)
  - Downshift (auto complete)
  - react-virtuoso (virtualized views)
- .nvmrc

# Setup Documentation

These are the following steps to setup this monorepo template.

## Tools You Need

- Node 16.15.x+: Recommend NVM (https://github.com/nvm-sh/nvm#installing-and-updating)

## Running Locally

### Running the Code
- run `npm install`
- copy `.evn-template` to `.env` and fill in values
- copy `applications/web/src/index.html-template` to `applications/web/src/index.html` and fill in values
- run `npm run start:api` and `npm run start:web`
