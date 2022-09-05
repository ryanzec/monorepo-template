import { useCallback, useState } from 'react';

export interface UseToggle {
  isToggled: boolean;
  setIsToggled: (isToggled: boolean) => void;
  toggle: () => void;
}

interface InternalToggle {
  isToggled: UseToggle['isToggled'];
  setIsToggled: UseToggle['setIsToggled'];
}

export const internalToggle = ({ isToggled, setIsToggled }: InternalToggle) => {
  setIsToggled(!isToggled);
};

export const useToggled = (defaultIsToggled = false): UseToggle => {
  const [isToggled, setIsToggled] = useState<boolean>(defaultIsToggled);

  const toggle = useCallback(() => {
    internalToggle({ isToggled, setIsToggled });
  }, [isToggled, setIsToggled]);

  return {
    isToggled,
    setIsToggled,
    toggle,
  };
};
