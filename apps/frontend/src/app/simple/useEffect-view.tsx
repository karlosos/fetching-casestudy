import { UseEffectCreateForm } from './useEffect-create-form';
import { UseEffectFetching, useElements } from './useEffect-fetching';

export const UseEffectView = () => {
  const elements = useElements();

  return (
    <>
      <UseEffectCreateForm refetch={elements.refetch} /> <br />
      <UseEffectFetching elements={elements} />
    </>
  );
};
