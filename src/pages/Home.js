import React from 'react';
import Search from "../components/Search";
import Card from "../components/Card";

const Home = () => {
  const cards = [1, 2, 3, 4];
  
  return (
    <React.Fragment>
      <Search/>
      <div className="row">
        {
          cards.map((item) => {
            return(
              <div className="col-sm-4 mb-4" key={item}>
                <Card/>
              </div>
            );
          })
        }
      </div>
    </React.Fragment>
  );
};

export default Home;