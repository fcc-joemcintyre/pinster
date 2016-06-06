import React from 'react';
import {Link} from 'react-router';
import {updatePin} from '../store/actions';
import {getPin} from '../store/pins';
import FilteredInput from '../../ui/FilteredInput.jsx';

const textChars = /[ -~]/;

export default class EditPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    let pin = getPin (this.context.store.getState (), this.props.params._id);
    this.state = {
      _id: pin._id,
      url: pin.url,
      title: pin.title,
      text: pin.text,
      category: pin.category,
      error: false
    };
    this.save = this.save.bind (this);
  }

  save (event) {
    event.preventDefault ();
    if (! ((this.state.url === '') || (this.state.title === '') || (this.state.category === ''))) {
      this.context.store.dispatch (updatePin (this.state._id, this.state.category, this.state.title, this.state.text, this.state.url))
      .then (success => {
        this.setState ({ error: false });
        this.context.router.push ('/manage');
      }).catch (error => {
        this.setState ({ error: true });
      });
    }
  }

  render() {
    return (
      <div className='dialogNoLabels'>
        <h2>Edit Pin</h2>
        <hr/>
        <div>
          <FilteredInput
            autoFocus={true}
            type='text'
            placeholder='picture (URL)'
            maxLength={512}
            autoCapitalize='none'
            autoCorrect='off'
            value={this.state.url}
            onChange={e => {
              this.setState ({url: e.target.value});
            }}/>
          <FilteredInput
            type='text'
            placeholder='category'
            maxLength={20}
            filter={textChars}
            value={this.state.category}
            onChange={e => {
              this.setState ({category: e.target.value});
            }}/>
          <FilteredInput
            type='text'
            placeholder='title'
            maxLength={60}
            filter={textChars}
            value={this.state.title}
            onChange={e => {
              this.setState ({title: e.target.value});
            }}/>
          <textarea
            placeholder='description'
            maxLength={512}
            rows='5'
            value={this.state.text}
            onChange={e => {
              this.setState ({text: e.target.value});
            }}>
          </textarea>
          <button className='dialogButton'
            disabled={(this.state.url === '') || (this.state.category === '')
              || (this.state.title === '') || (this.state.text === '')}
            onClick={this.save}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

EditPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
};
