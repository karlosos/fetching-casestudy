import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateElementRequest } from '../../api/createElement/apiTypes';
import { createElement } from '../../api';
import { PanelContentStyled, PanelFooterStyled, PanelHeaderStyled, PanelStyled } from '../../ui/panel';
import { Button, Select, Text, TextInput } from '@mantine/core';
import { DeviceType } from '../../api/apiTypes';
import { useElements } from './use-elements';

type Props = Pick<ReturnType<typeof useElements>, 'refetch'>;

/*
TODO:

- [ ] Show feedback message on error/success
- [ ] Clear device type on success
- [ ] https://mantine.dev/guides/6x-to-7x/

*/

export const UseEffectCreateForm: React.FC<Props> = ({ refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<CreateElementRequest>();
  const [isPending, setIsPending] = useState(false);

  const onSubmit: SubmitHandler<CreateElementRequest> = async (data) => {
    setIsPending(true);

    let newElement;
    try {
      newElement = await createElement(data);
    } catch (e) {
      console.error(e);
    }
    if (newElement) {
      reset();
    }

    setIsPending(false);

    refetch({ inForeground: false });
  };

  return (
    <PanelStyled>
      <PanelHeaderStyled>
        <Text fw={600} c="dark.5">
          Elements
        </Text>
      </PanelHeaderStyled>
      <PanelContentStyled>
        <form onSubmit={handleSubmit(onSubmit)} id="create-element-form">
          <TextInput
            label="DN"
            {...register('dn', { required: true })}
            disabled={isPending}
            size="sm"
            withAsterisk
            error={errors.dn && 'This field is required'}
            mt="sm"
          />
          <Select
            data={[
              { value: DeviceType.eNodeB, label: 'eNodeB' },
              { value: DeviceType.gNodeB, label: 'gNodeB' },
            ]}
            label="Device Type"
            {...register('deviceType', { required: true })}
            onChange={(value: DeviceType) => value && setValue('deviceType', value)}
            disabled={isPending}
            size="sm"
            withAsterisk
            error={errors.deviceType && 'This field is required'}
            mt="sm"
            clearable
          />
          <TextInput
            label="IP"
            {...register('ip', { required: true })}
            disabled={isPending}
            size="sm"
            withAsterisk
            error={errors.ip && 'This field is required'}
            mt="sm"
          />
          <TextInput label="Longitude" {...register('longitude')} disabled={isPending} size="sm" mt="sm" />
          <TextInput label="Latitude" {...register('longitude')} disabled={isPending} size="sm" mt="sm" />
        </form>
      </PanelContentStyled>
      <PanelFooterStyled>
        <Button type="submit" disabled={isPending} form="create-element-form">
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </PanelFooterStyled>
    </PanelStyled>
  );
};
