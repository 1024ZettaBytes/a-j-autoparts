import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import ServicesCard from './ServicesCard';
import ServicesAlertCard from './ServicesAlertCard';
import InventoryAlertCard from './InventoryAlertCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
       <Grid item xs={12} md={4}>
            <ServicesCard isLoading={isLoading} title='Servicios Activos' />
          </Grid>
          <Grid item xs={12} md={4}>
            <ServicesAlertCard isLoading={isLoading} title='Alertas Servicios'/>
          </Grid>
          <Grid item xs={12} md={4}>
            <InventoryAlertCard isLoading={isLoading} title='Alertas inventario'/>
          </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>


        </Grid>
      </Grid>

    </Grid>
  );
};

export default Dashboard;
