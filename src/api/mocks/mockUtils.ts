export const simulateDelay = async (from = 30, to = 60) => {
  const timeout = Math.random() * (to - from) + from; // timeout from ${from}ms to ${to}ms
  await new Promise((res) => setTimeout(res, timeout));
};

export const shouldThrowError = ({ probability = 0.25 } = {}) => {
  if (Math.random() < probability) {
    return true;
  }
  return false;
};
