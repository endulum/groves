/* eslint-disable no-console */
import { useEffect } from 'react';

export default function useLogger(...args: Array<unknown>) {
  useEffect(() => {
    console.log({ ...args });
  }, [...args]);
}
