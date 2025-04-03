import React, { useState } from 'react';
import { useLoader } from '../main/LoaderContext';
import { useEffect } from 'react';
import { FaHeart } from "react-icons/fa";

const Dashboard = () => {

  const { hideLoader } = useLoader();
  const [state, setState] = useState(0)

  useEffect(() => {
    hideLoader();
  }, [hideLoader]);

  const handleAvanti = () => {
    if (state < 5) {
      setState(state + 1);
    }
  }

  return (
    <div className='MainDiv Dashboard_MainDiv'>
      {state === 0 && <div>
        Ciao piccolina
      </div>}
      {state === 1 && <div>
        Qui prima o poi ci sarà qualcosa
      </div>}
      {state === 2 && <div>
        Qualcosa di utile sicuramente
      </div>}
      {state === 3 && <div>
        Ma prima di tutto questo
      </div>}
      {(state === 4 || state === 5) &&
        <div>
          Volevo dirti che ti amo tantissimo
          {state === 5 &&
            <div className='aas_wrapper'>
              <div className='aas'>
                <div><FaHeart /></div>
                <img alt="noi" src="images/noi.jpg"></img>
              </div>
            </div>
          }
        </div>}
      {state !== 5 && <button onClick={handleAvanti}>Avanti</button>}
    </div>
  );
};

export default Dashboard;
