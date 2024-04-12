import { useElements } from './use-elements';
import { UseEffectCreateForm } from './useEffect-create-form';
import { UseEffectFetching } from './useEffect-fetching';

export const UseEffectView = () => {
  const elements = useElements();

  return (
    <>
      <UseEffectFetching elements={elements} />
      <UseEffectCreateForm refetch={elements.refetch} /> <br />
    </>
  );
};
