import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createElement, getElements } from '../../api';
import { CreateElementRequest } from '../../api/apiTypes';

export const TanstackQueryCreateForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateElementRequest>();

  // TODO: might be a problem with dynamic size and startIndex
  //       it will do fine for now
  //       alternatively i could do the same as in useEffect-view.tsx
  const { refetch } = useQuery({
    queryKey: ['elements'],
    queryFn: () => getElements({ size: 50, startIndex: 0 }),
  });

  const [isPending, setIsPending] = useState(false);

  const createElementMutation = useMutation({
    mutationFn: createElement,
    onMutate: (_variables) => {
      setIsPending(true);
    },
    onSuccess: (_data, _variables, _context) => {
      refetch();
      reset();
    },
    onError: (error) => {
      console.log('>> onError', error);
    },
    onSettled: (_data, _error, _variables, _context) => {
      console.log('>> onSettled');
      setIsPending(false);
    },
  });

  const onSubmit: SubmitHandler<CreateElementRequest> = async (data) => {
    createElementMutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="dn">dn:</label>
        <br />
        <input {...register('dn', { required: true })} disabled={isPending} />
        {errors.dn && <span>This field is required</span>}
        <br />

        <label htmlFor="device_type">device type:</label>
        <br />
        <input {...register('deviceType', { required: true })} disabled={isPending} />
        {errors.deviceType && <span>This field is required</span>}
        <br />

        <label htmlFor="ip">ip:</label>
        <br />
        <input {...register('ip', { required: true })} disabled={isPending} />
        {errors.ip && <span>This field is required</span>}
        <br />

        <label htmlFor="longitude">longitude:</label>
        <br />
        <input {...register('longitude')} disabled={isPending} />
        <br />

        <label htmlFor="latitude">longitude:</label>
        <br />
        <input {...register('latitude')} disabled={isPending} />
        <br />

        <input type="submit" value={isPending ? 'Saving...' : 'Save'} disabled={isPending} />
      </form>
    </div>
  );
};
