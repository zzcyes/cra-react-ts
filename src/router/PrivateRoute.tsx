import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = () => {
      // TODO: do something
    };

    redirect();
  }, [navigate]);

  return <>{children}</>;
};

export default PrivateRoute;
