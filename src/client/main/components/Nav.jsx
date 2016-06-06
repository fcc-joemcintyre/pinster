import React from 'react';
import {Link, IndexLink} from 'react-router';

// Header with application and common navigation
export default class Nav extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    let appLinks = [];
    let titleLinks = [];

    appLinks.push (<li key='a1'><IndexLink to='/' activeClassName='active'>Home</IndexLink></li>);
    if (this.props.loggedIn) {
      titleLinks.push (<li key='t1'><Link to='/logout'>Logout</Link></li>);
      appLinks.push (<li key='a2'><Link to='/pinned' activeClassName='active'>Pinned</Link></li>);
      appLinks.push (<li key='a3'><Link to='/manage' activeClassName='active'>Manage</Link></li>);
    } else {
      titleLinks.push (<li key='t2'><Link to='/register'>Register</Link></li>);
      titleLinks.push (<li key='t3'><Link to='/login'>Login</Link></li>);
    }
    appLinks.push (<li key='a5'><Link to='/about' activeClassName='active'>About</Link></li>);

    return (
      <div className='nav'>
        <div className='navTitle'>
          <h1>Pinster</h1>
          <ul style={{float:'right'}}>
            {titleLinks}
          </ul>
        </div>
        <div className='navApp'>
          <ul style={{float:'left'}}>
            {appLinks}
          </ul>
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired
}
