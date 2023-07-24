# 🎆 FFTC Project 

> Frontend Fetching Techniques Comparison

## About 📝

This projects was meant to be a case study for comparing various fetching techniques on the frontend. It was also an opportunity to check `nx`, `express-zod-api` and `drizzle` along the way. 

On the frontend we have the same view implemented using different techniques. 

### Frontend 🪟

Frontend is using multiple libraries for fetching/caching data from the server:

- manual redux/thunk approach
- createAsyncThunk approach
- redux rtkquery approach
- tanstack query approach
- swr approach

There is `api` module that defines all consumed endpoints. It is anti-corruption layer that transforms data fetched from the backend into internal types.

For development pursposes `msw` is used so the frontend could have been developed without backend.

### Backend 🧱

Backend is written in express.js using [express-zod-api](https://github.com/RobinTail/express-zod-api) and inspired by [Minimal-Express-Zod-Api-Boilerplate](https://github.com/TheNaubit/Minimal-Express-Zod-Api-Boilerplate). It is using `sqlite` db with `drizzle` and `drizzle-kit`. 

## Development 👨‍💻

### E2E Development ⛓️

- run `npm run dev` to run whole monorepo (frontend + backend)
- `npx nx graph --watch` to see a diagram of the dependencies of the project

### Frontend development 🪟

- run `npx nx serve frontend` to run the dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.
  - frontend is configured to use mocks (with msw) by default. See `apps/frontend/src/mocks.ts`
- run `npx nx test frontend` to run frontend tests

### Backend development 🧱

- Swagger (OpenAPI) yaml can be found in `apps/backend/docs/api.yaml` 
- run `npx nx serve backend` to run the backend server.
- run `npx nx run backend:db:clear` to prepare clean, seeded database
- run `npx nx run backend:db:push` to push schema changes to `sqlite`
- run `npx nx run backend:db:generate` to generate migration file
- run `npx nx run backend:db:studio` to launch db studio
- run `npx nx run backend:docs:generate` to generate api docs into `./docs/api.yaml` directory

## Resources 📚️

- Visit the [Nx Documentation](https://nx.dev) to learn more about Nx.

## Notes 📋️

- I will name `tanstack-query`, `rtk-query` and `swr` as modern data fetching in the notes.
- I am not sure if it's correct way of refetching with _modern data fetching_ libraries. Probably it should be loaded in the background without showing loading spinner.
- To have proper comparison I would need to disable retrying on failure for _modern data fetching_. Or at least unify them. `tanstack-query` has the best options out of the box in my opinion. I like incremental time for retrying.
- Error handling with current `api` directory is not great. When getting data from the backend that has incorrect format and can't be mapped we get `ApiError` without any details. It's hard to debug. Maybe `zod` would be a good solution for this problem? Or alternatively we could wrap `mapper` with try catch?
  - Edit `getElements` mock to see the problem.
- The `elementIdsBeingDeleted` object could be merged with regular `data` object so that each `element` has `isBeingDeleted: boolean` value.
- Problem with api that when there is some error (even on client side) then there will be `Internal Server Error` error. Hard to debug. For example if there is an error on mapper side. Investigate if `zod` would solve the issue.

## Updating strategy 🔝

- Upgrade nx with `nx migrate latest --run-migrations`
- Get list of outdated packages with `npm outdated`
- Upgrade manualy packages with `npm install package@version`
- Format code changes with `npm run format`

## Roadmap 🛣️🎯

- [ ] `getElements` api endpoint on frontend
  - [x] tests
  - [x] mocks with msw
  - [ ] expand api with filtering and sorting
- [ ] Fetching data and displaying it
  - [x] Using simple useEffect with hook
  - [x] Using redux thunk
  - [x] Using redux createAsyncThunk
  - [x] Using redux rtk-query
  - [x] Using tanstack-query
  - [x] Using swr
  - [x] refetching data
  - [ ] Testing each view for loading data
- [x] `deleteElement` api endpoint on frontend
  - [x] tests
  - [x] mocks with msw
- [x] Deleting element from ui using redux
  - [x] Using simple useEffect with hook
  - [x] Using redux thunk
  - [x] Using redux createAsyncThunk
  - [x] using redux rtk-query
  - [x] Using tanstack-query
  - [x] Using swr
- [x] `createElement` api endpoint on frontend
  - [x] tests
  - [x] mocks with msw
- [x] Creating element from ui using redux
  - [x] Using simple useEffect with hook
  - [x] Using redux thunk
  - [x] Using redux createAsyncThunk
  - [x] using redux rtk-query
  - [x] Using tanstack-query
  - [x] Using swr
- [ ] `updateElement` api endpoint on frontend
  - [ ] tests
  - [ ] mocks with msw
- [ ] Error case
  - [ ] Deleting [feedback message]
  - [ ] Creating [feedback message]
- [ ] Updating element from ui
  - [ ] Using simple useEffect with hook
  - [ ] Using redux thunk
  - [ ] Using redux createAsyncThunk
  - [ ] using redux rtk-query
  - [ ] Using tanstack-query
  - [ ] Using swr
- [ ] add total count to the table views
- [ ] investigate usage od `zod` in api
- [x] investigate usage of `redux-hook-form` on update/create forms
- [ ] implement simple backend api with sqlite db
  - [ ] get elements endpoint
  - [ ] create element endpoint 
  - [ ] delete clement endpoint
  - [ ] custom response
  - [ ] configure logger
  - [ ] generate api docs
- [ ] create ui component library
- [ ] investigate integration tests with cypress/playwright in addition to rtl
  - [ ] i have removed cypress-e2e tests in a7743b6. revert this change
- [ ] toast notifications with https://react-hot-toast.com/
- [ ] automatic updates with dependabot
