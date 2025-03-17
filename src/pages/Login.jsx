import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import IconInput from '../components/IconInput';
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import Alert from "../components/alert";
import { useLoader } from "../main/LoaderContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  // Controlla se l'utente è già loggato al montaggio del componente
  useEffect(() => {
    showLoader(); // Mostra il loader
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard', { replace: true });
      }
      hideLoader(); // Nascondi il loader una volta controllata la sessione
    });
  }, [navigate, showLoader, hideLoader]);

  const handleLogin = async (e) => {
    e.preventDefault();
    showLoader();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      hideLoader();
    } else {
      // Attendi, ad esempio, 500ms per mostrare il loader, poi naviga
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 500);
    }
  };



  return (
    <>
      {error && (
        <Alert
          Type="error"
          Title="Errore"
          Description="Username o password non esistente"
          onClose={() => setError("")}
          Modal={true}
        />
      )}
      <div className='Login_MainDiv'>
        <div className='Login_LeftPart'>
          <div className='Login_LeftPart_Form'>
            <div className='Login_LeftPart_Text'>
              <p>Bentornata baby su <span className='c-primary-darker c-bold'>jesscare!</span></p>
              <h1>Login</h1>
            </div>
            <form onSubmit={handleLogin}>
              <div>
                <label>Email:</label><br />
                <IconInput
                  icon={<MdEmail />}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password:</label><br />
                <IconInput
                  icon={<TbLockPassword />}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='flex row width100 centerx'>
                <button type="submit">Accedi</button>
              </div>
            </form>
          </div>
        </div>
        <div className='Login_RightPart'>
          <img src="images/logo/grande/logo_full_normal.png" alt="logo" />
        </div>
      </div>
    </>
  );
};

export default Login;
