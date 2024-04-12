import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateElementRequest } from '../../api/createElement/apiTypes';
import { useCreateElementMutation } from './api';

export const RtkQueryFnCreateForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateElementRequest>();
  const [createElement, { isLoading: isPending }] = useCreateElementMutation();

  const onSubmit: SubmitHandler<CreateElementRequest> = async (data) => {
    createElement(data)
      .unwrap()
      .then(() => {
        reset();
      })
      .catch(() => {
        console.log('>> something bad happened during creation of the element');
      });
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
