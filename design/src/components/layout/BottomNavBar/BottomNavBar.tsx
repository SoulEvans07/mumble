import { ReactElement } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import './BottomNavBar.scss';

import { Icon } from '../../ui/Icon/Icon';
import { NavTab } from './types';
import { PlayerBar } from '../PlayerBar/PlayerBar';

interface BottomNavBarProps {
  tabs: NavTab[];
}

export function BottomNavBar(props: BottomNavBarProps): ReactElement {
  const { tabs } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const onMenuSelect = (path: string) => () => navigate(path);

  return (
    <>
      <Outlet />
      <PlayerBar />
      <nav className="bottom-nav-bar">
        {tabs.map(tab => (
          <div
            className={classNames('tab-btn', { active: location.pathname === tab.path })}
            onClick={onMenuSelect(tab.path)}
            key={tab.path}
          >
            <Icon icon={tab.icon} />
            <span className="title">{tab.title}</span>
          </div>
        ))}
      </nav>
    </>
  );
}
