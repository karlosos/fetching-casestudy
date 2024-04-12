import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateElementRequest } from '../../api/apiTypes';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import { RequestStatus } from '../types';
import { createElement, fetchElements } from './slice';

export const AsyncThunkCreateForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateElementRequest>();
  const dispatch = useAppDispatch();

  const isPending = useAppSelector(
    (state: RootState) => state.elementsCreateAsyncThunkFetching.creatingElementStatus === RequestStatus.Ongoing 
  );

  const onSubmit: SubmitHandler<CreateElementRequest> = async (data) => {
    try {
      const _result = await dispatch(createElement(data)).unwrap();
      reset();
      dispatch(fetchElements({ size: 50, startIndex: 0 }));
    } catch (e) {
      console.log('>> error', e);
    }
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
