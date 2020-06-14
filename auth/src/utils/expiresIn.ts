import ms from "ms";
export const expiresIn = (expireDateInString: string): number =>
  ms(expireDateInString) / 1000;

export const convertMsToString = (
  milliSeconds: number,
  options: { long: boolean }
) => {
  const timeDifference = new Date(milliSeconds * 1000).getTime() - Date.now();
  return ms(timeDifference, { ...options });
};
