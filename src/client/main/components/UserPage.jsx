import React from 'react';
import {Link} from 'react-router';
import Pin from './Pin.jsx';
import {setPins, updateLikes, setLike} from '../store/actions';
import Masonry from 'react-masonry-component';

export default class UserPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    let s = context.store.getState ();
    this.state = {
      pins: s.pins,
      loggedIn: s.user.authenticated
    }
  }

  componentWillMount () {
    this.unsubscribe = this.context.store.subscribe (() => {
      let s = this.context.store.getState ();
      this.setState ({pins: s.pins, loggedIn: s.user.authenticated});
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  render () {
    let items = [];
    let pins = this.state.pins;
    for (let pin of pins) {
      if (pin.creator === this.props.params.id) {
        items.push (
          <Pin key={pin._id}
            loggedIn={this.state.loggedIn}
            editPage={false}
            pin={pin}
            onClick={() => {
              this.context.store.dispatch (setLike (pin, pin.like ? false : true));
            }}
          />
        );
      }
    }

    return (
      <div className='homePage'>
        <div className='items'>
          <Masonry elementType='div'>
            {items}
          </Masonry>
        </div>
      </div>
    );
  }
}

UserPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
}
