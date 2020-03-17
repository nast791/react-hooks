import React, {useContext, useEffect} from 'react';
import {GithubContext} from "../context/github/GithubContext";
import {Link} from "react-router-dom";
import Repos from "../components/Repos";

const Profile = ({match}) => {
  const {getUser, getRepos, loading, user, repos} = useContext(GithubContext);
  const urlName = match.params.name;

  useEffect(() => {
    getUser(urlName);
    getRepos(urlName);
  }, []);

  if (loading) {
    return <p className="text-center">Загрузка...</p>
  }

  const {name, company, avatar_url, location, bio, blog, login, html_url, following, followers, public_repos, public_gists} = user;

  return (
    <React.Fragment>
      <Link to="/" className="btn btn-link">На главную</Link>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 col-sm-6 text-center">
              <img src={avatar_url} alt={name} style={{width: '215px'}} />
              <h1>{name}</h1>
              {location && <p>Местоположение: <br/>{location}</p>}
            </div>
            <div className="col">
              {bio &&
              <React.Fragment>
                <h3>BIO</h3>
                <p>{bio}</p>
              </React.Fragment>}
              <a href={html_url} target="_blank" rel="noopener noreferrer" className="btn btn-dark mb-2">Открыть профиль</a>
              <ul>
                {login &&
                <li>
                  <strong>Username: </strong> {login}
                </li>}

                {company &&
                <li>
                  <strong>Company: </strong> {company}
                </li>}

                {blog &&
                <li>
                  <strong>Website: </strong> {blog}
                </li>}
              </ul>

              <div className="badge badge-primary mr-2">Подписчики: {followers}</div>
              <div className="badge badge-success mr-2">Подписан: {following}</div>
              <div className="badge badge-info mr-2">Репозитории: {public_repos}</div>
              <div className="badge badge-dark mr-2">Gists: {public_gists}</div>
            </div>
          </div>
        </div>
      </div>

      <Repos repos={repos} />
    </React.Fragment>
  );
};

export default Profile;