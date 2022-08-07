import { ReactElement } from 'react';
import classNames from 'classnames';
import './BottomNavBar.scss';

import { Icon } from '../../ui/Icon/Icon';
import { NavTab } from './types';

interface BottomNavBarProps {
  tabs: NavTab[];
}

export function BottomNavBar(props: BottomNavBarProps): ReactElement {
  const { tabs } = props;
  return (
    <section className="bottom-nav-bar">
      {tabs.map(tab => (
        <div className={classNames('tab-btn')} key={tab.name}>
          <Icon icon={tab.icon} />
          <span className="title">{tab.title}</span>
        </div>
      ))}
    </section>
  );
}
