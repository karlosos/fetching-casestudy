import { UseEffectCreateForm } from './useEffect-create-form';
import { UseEffectFetching, useElements } from './useEffect-fetching';

export const UseEffectView = () => {
  const elements = useElements();

  return (
    <>
      <UseEffectFetching elements={elements} />
      <UseEffectCreateForm refetch={elements.refetch} /> <br />
    </>
  );
};
