import React, {useContext} from 'react';
import {AlertContext} from "../context/alert/AlertContext";

const Search = () => {
  const {show} = useContext(AlertContext);
  const onSubmit = (event) => {
    if (event.key === 'Enter') {
      show('Alert!');
    }
  };

  return (
    <div className="form-group">
      <input type="text" className="form-control" placeholder="Введите ник пользователя" onKeyPress={onSubmit}/>
    </div>
  );
};

export default Search;