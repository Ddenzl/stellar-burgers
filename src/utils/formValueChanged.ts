import { TRegisterData } from '@api';

export const formValueChanged = (
  userData: Partial<TRegisterData>,
  currentValue: TRegisterData
): Partial<TRegisterData> =>
  (Object.keys(currentValue) as Array<keyof TRegisterData>).reduce(
    (acc, key) => {
      if (userData[key] !== currentValue[key]) {
        acc[key] = currentValue[key];
      }
      return acc;
    },
    {} as Partial<TRegisterData>
  );
