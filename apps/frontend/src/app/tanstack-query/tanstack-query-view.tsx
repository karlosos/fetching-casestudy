import { TanstackQueryCreateForm } from './tanstack-query-create-form';
import { TanstackQueryFetching } from './tanstack-query-fetching';

export const TanstackQueryView = () => {
  return (
    <>
      <TanstackQueryCreateForm /> <br />
      <TanstackQueryFetching />
    </>
  );
};
