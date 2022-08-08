import { ReactElement, useMemo } from 'react';
import classNames from 'classnames';
import './IconMultiCheckbox.scss';

import { Icon, IconProps } from '../../ui/Icon/Icon';

interface IconMultiCheckboxProps<T extends string> extends Omit<IconProps, 'onClick' | 'onChange'> {
  value: T;
  states: {
    value: T;
    checked?: boolean;
    icon?: string;
  }[];
  onChange?: (value: T) => void;
}

export function IconMultiCheckbox<T extends string>(props: IconMultiCheckboxProps<T>): ReactElement {
  const { value, states, onChange, className, icon, ...restProps } = props;

  const onClick = () => {
    if (onChange) {
      const next = (states.findIndex(s => s.value === value) + 1) % states.length;
      onChange(states[next]?.value);
    }
  };

  const state = useMemo(() => states.find(s => s.value === value), [value, states]);

  const stateIcon = useMemo(() => {
    if (state) return state.icon || icon;
    return icon;
  }, [value, state, icon]);

  return (
    <div className={classNames('icon-multi-checkbox', className, { checked: state?.checked })} onClick={onClick}>
      <Icon className="main-icon" icon={stateIcon} {...restProps} />
      {!!state?.checked && <Icon icon="period" className="dot" />}
    </div>
  );
}
