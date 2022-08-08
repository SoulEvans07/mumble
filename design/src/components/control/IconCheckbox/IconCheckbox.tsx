import { ReactElement } from 'react';
import classNames from 'classnames';
import './IconCheckbox.scss';

import { Icon, IconProps } from '../../ui/Icon/Icon';

interface IconCheckboxProps extends Omit<IconProps, 'onClick'> {
  checked?: boolean;
  onClick?: VoidFunction;
}

export function IconCheckbox(props: IconCheckboxProps): ReactElement {
  const { checked, onClick, className, ...restProps } = props;

  return (
    <div className={classNames('icon-checkbox', className, { checked })} onClick={onClick}>
      <Icon className="main-icon" {...restProps} />
      {checked && <Icon icon="period" className="dot" />}
    </div>
  );
}
