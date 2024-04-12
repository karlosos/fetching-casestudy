import { ThunkCreateForm } from './thunk-create-form';
import { ThunkFetching } from './thunk-fetching';

export const ThunkView = () => {
  return (
    <>
      <ThunkCreateForm /> <br />
      <ThunkFetching />
    </>
  );
};
