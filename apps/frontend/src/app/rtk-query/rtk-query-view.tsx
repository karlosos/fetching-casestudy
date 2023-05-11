import { RtkQueryCreateForm } from "./rtk-query-create-form";
import { RtkQueryFetching } from "./rtk-query-fetching";

export const RtkQueryView = () => {
  return (
    <>
      <RtkQueryCreateForm />
      <RtkQueryFetching /> <br />
    </>
  );
};
