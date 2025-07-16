import React from 'react';
import { Portfolio } from '../components/Portfolio';
import { withPageAnimation } from '../components/withPageAnimation';

function PortfolioPage() {
  console.log('PortfolioPage rendering');
  return (
    <div className="min-h-screen">
      <Portfolio />
    </div>
  );
}

export default withPageAnimation(PortfolioPage); 