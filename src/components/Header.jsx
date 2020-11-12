import React, { Component } from 'react';
import { Link, Location } from '@reach/router';
import UserBar from './UserBar';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Link className="header" to="/">
          <h1>CharityBay</h1>
        </Link>
        <Location>
          {({ location }) => {
            return <UserBar location={location} />;
          }}
        </Location>
      </header>
    );
  }
}

export default Header;
