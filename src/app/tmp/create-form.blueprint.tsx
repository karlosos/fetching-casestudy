import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateElementRequest } from '../../api/apiTypes';

export const TanstackQueryCreateForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateElementRequest>();

  const [isPending, setIsPending] = useState(false);

  const onSubmit: SubmitHandler<CreateElementRequest> = async (data) => {
    setIsPending(true);
    console.log('>> onSubmit', data);
    await new Promise((res) => setTimeout(res, 3000));
    setIsPending(false);
    reset();
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
