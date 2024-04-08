import React from 'react';
import Settings from './Settings';
import StatsTable from './StatsTable';
import Timer from './Timer';

const CurrentPage = ({ showSettings, showStats }: { showSettings: boolean; showStats: boolean }) => {
  switch (true) {
    case showSettings:
      return <Settings />;
    case showStats:
      return <StatsTable />;
    default:
      return <Timer />;
  }
}

export default CurrentPage;