import React from 'react';
import { useLoader } from '../main/LoaderContext';
import { useEffect } from 'react';

const Dashboard = () => {

  const { hideLoader } = useLoader();

  useEffect(() => {
    // Quando il Dashboard è montato, nascondi il loader
    hideLoader();
  }, [hideLoader]);

  return (
    <div>
   
    </div>
  );
};

export default Dashboard;
