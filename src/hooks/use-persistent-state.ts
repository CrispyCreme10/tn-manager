import { LocalStorageHandler } from "@/utils/web-storage";
import { useEffect, useState } from "react";

export default function usePersistantState<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [state, setInternalState] = useState<T>(initialValue);

  useEffect(() => {
    const value = LocalStorageHandler.getItem<T>(key);

    if (!value) return;

    setInternalState(value);
  }, [key]);

  const setState = (value: T) => {
    LocalStorageHandler.setItem(key, value);
    setInternalState(value);
  };

  return [state, setState];
}
