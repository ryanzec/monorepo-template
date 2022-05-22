import { useCallback, useState } from 'react';

export interface UseToggle {
  isToggled: boolean;
  setIsToggled: (isToggled: boolean) => void;
  toggle: () => void;
}

export const useToggled = (defaultIsToggled = false): UseToggle => {
  const [isToggled, setIsToggled] = useState<boolean>(defaultIsToggled);

  const toggle = useCallback(() => {
    setIsToggled(!isToggled);
  }, [isToggled, setIsToggled]);

  return {
    isToggled,
    setIsToggled,
    toggle,
  };
};

export default useToggled;
