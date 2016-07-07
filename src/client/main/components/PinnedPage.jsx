import React from 'react';
import Pin from './Pin.jsx';
import {setPins, togglePinned} from '../store/actions';
import Masonry from 'react-masonry-component';

export default class PinnedPage extends React.Component {
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
      if (pin.pinned) {
        items.push (
          <Pin key={pin._id}
            loggedIn={this.state.loggedIn}
            editPage={false}
            pin={pin}
            handleTogglePinned={() => {
              this.context.store.dispatch (togglePinned (pin));
            }}/>
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

PinnedPage.contextTypes = {
  store: React.PropTypes.object.isRequired
}
