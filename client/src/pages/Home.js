import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    fetchPolicy: "no-cache"
  });

  const matchupList = data?.matchups || [];

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header text-center">
        <h1>Welcome to Trader Junks!</h1>
      </div>
      <div className="card-body m-5">
        <h2>Here are some items you might like:</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="square">
            {matchupList.map((matchup) => {
              return (
                <li key={matchup._id}>
                  <Link to={{ pathname: `/matchup/${matchup._id}` }}>
                    {matchup.tech1} vs. {matchup.tech2}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="card-footer text-center m-3">
        <h2>Ready to proceed to purchase?</h2>
        <Link to="/matchup">
          <button className="btn btn-lg btn-danger">Checkout!</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;