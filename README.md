# Case study of various client-side fetching techniques 

## Development 👨‍💻

- run `npx nx serve frontend` to run the dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.
  - frontend is configured to use mocks (with msw) by default. See `apps/frontend/src/mocks.ts`
- run `npx nx serve backend` to run the backend server.
- `npx nx graph --watch` to see a diagram of the dependencies of the project
- run `npx ns test frontend` to run frontend tests

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
- [ ] Creating element from ui using redux
  - [ ] Using simple useEffect with hook
  - [ ] Using redux thunk
  - [ ] Using redux createAsyncThunk
  - [ ] using redux rtk-query
  - [ ] Using tanstack-query
  - [ ] Using swr
- [ ] `updateElement` api endpoint on frontend
  - [ ] tests
  - [ ] mocks with msw
- [ ] Updating element from ui using redux
  - [ ] Using simple useEffect with hook
  - [ ] Using redux thunk
  - [ ] Using redux createAsyncThunk
  - [ ] using redux rtk-query
  - [ ] Using tanstack-query
  - [ ] Using swr
- [ ] add total count to the table views
- [ ] investigate usage od `zod` in api
- [ ] investigate usage of `redux-hook-form` on update/create forms
- [ ] implement simple backend api with sqlite db
- [ ] create ui component library
- [ ] investigate integration tests with cypress/playwright in addition to rtl
