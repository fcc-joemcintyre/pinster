import React from 'react';
import {Link} from 'react-router';
import Pin from './Pin.jsx';
import {deletePin} from '../store/actions';
import Masonry from 'react-masonry-component';

export default class ManagePage extends React.Component {
  constructor (props, context) {
    super (props, context);
    let s = context.store.getState ();
    this.state = {
      id: s.user.id,
      pins: s.pins
    }
  }

  componentWillMount () {
    this.unsubscribe = this.context.store.subscribe (() => {
      let s = this.context.store.getState ();
      this.setState ({pins: s.pins});
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  render () {
    let items = [];
    items.push (
      <div key='0'
        className='addPin'
        onClick={() => {this.context.router.push ('/add')}}>
        <div className='addSign'>
          +
        </div>
        <h3>Add Pin</h3>
      </div>
    );
    let pins = this.state.pins;
    for (let pin of pins) {
      if (pin.creator === this.state.id) {
        items.push (
          <Pin key={pin._id}
            loggedIn={true}
            editPage={true}
            pin={pin}
            handleEditPin={(pinId) => {this.context.router.push (`/edit/${pinId}`)}}
            handleDeletePin={(pinId) => {this.context.store.dispatch (deletePin (pinId))}}
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

ManagePage.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
}
