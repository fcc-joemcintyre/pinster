import React from 'react';
import {Link} from 'react-router';

export default class Pin extends React.Component {
  constructor (props) {
    super (props);
    this.state = { imageError: false };
  }

  render () {
    let color = (this.props.loggedIn && this.props.pin.pinned) ? 'red' : 'off';
    let pinImageUri = `${location.origin}/images/pin-${color}-14.png`;
    let pinImage = <img src={pinImageUri} onClick={this.props.handleTogglePinned}/>;

    let countArea, creator, buttonArea;
    if (this.props.editPage === false) {
      countArea =
        <div className='countArea'>
          {pinImage}
          <span>{this.props.pin.count}</span>
        </div>;
      creator =
        <span className='creator'>
          <Link to={'/pins/' + this.props.pin.creator}>{this.props.pin.username}</Link>
        </span>;
    } else {
      buttonArea =
        <div className='buttonArea'>
          <button onClick={() => this.props.handleEditPin (this.props.pin._id)}>Edit</button>
          <button onClick={() => this.props.handleDeletePin (this.props.pin._id)}>Delete</button>
        </div>;
    }
    let image;
    if (this.state.imageError === false) {
      image = <img src={this.props.pin.url}
        onError={() => {this.setState ({imageError: true});}}/>;
    } else {
      image = <img src={`${location.origin}/images/image404-75.png`}/>;
    }

    return (
      <div className='pin'>
        <div className='imageContainer'>
          {image}
        </div>
        <h3>{this.props.pin.title}</h3>
        <p>{this.props.pin.text}</p>
        {countArea}
        <div>
          <span className='category'>{this.props.pin.category}</span>
          {creator}
          {buttonArea}
        </div>
      </div>
    );
  }
}

Pin.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  pin: React.PropTypes.object.isRequired,
  handleEditPin: React.PropTypes.func,
  handleDeletePin: React.PropTypes.func,
  handleTogglePinned: React.PropTypes.func,
  editPage: React.PropTypes.bool.isRequired
}
