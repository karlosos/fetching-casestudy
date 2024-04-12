import { RtkQueryFnCreateForm } from "./rtk-query-fn-create-form";
import { RtkQueryFnFetching } from "./rtk-query-fn-fetching";

export const RtkQueryFnView = () => {
  return (
    <>
      <RtkQueryFnCreateForm /> <br />
      <RtkQueryFnFetching />
    </>
  );
};
