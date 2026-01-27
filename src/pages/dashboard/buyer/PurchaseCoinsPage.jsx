import PurchaseCoin from '@/components/features/dashboard/buyer/PurchaseCoin';
import DashboardSectionHeader from '@/components/ui/dashboard-section-header';
import React from 'react';

const PurchaseCoinsPage = () => {
  return (
    <section>
      <DashboardSectionHeader title='Purchase Coins'/>
      <PurchaseCoin/>
    </section>
  );
};

export default PurchaseCoinsPage;