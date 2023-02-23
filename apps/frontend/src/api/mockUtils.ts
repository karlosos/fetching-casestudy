export const simulateDelay = async (from = 30, to = 60) => {
  const timeout = Math.random() * (to - from) + from; // timeout from ${from}ms to ${to}ms
  await new Promise((res) => setTimeout(res, timeout));
};

export const throwApiErrorWithGivenProbability = ({
  probability = 0.5,
  errorObject,
}: {
  probability?: number;
  errorObject?: { [key: string]: any };
} = {}) => {
  if (Math.random() < probability) {
    throw Object.assign(new Error(), {
      detail: 'Mock Error',
      status: 500,
      title: 'Error',
      ...errorObject,
    });
  }
};