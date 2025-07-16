import React from 'react';
import { Services } from '../components/Services';
import { withPageAnimation } from '../components/withPageAnimation';

function ServicesPage() {
  console.log('ServicesPage rendering');
  return (
    <div className="min-h-screen">
      <Services />
    </div>
  );
}

export default withPageAnimation(ServicesPage);
