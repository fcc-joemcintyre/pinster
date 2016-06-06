import React from 'react';
import {Link} from 'react-router';
import {addPin} from '../store/actions';
import FilteredInput from '../../ui/FilteredInput.jsx';

const textChars = /[ -~]/;

export default class AddPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      url: '',
      title: '',
      text: '',
      category: '',
      error: false
    }
    this.save = this.save.bind (this);
  }

  save (event) {
    event.preventDefault ();
    if (! ((this.state.url === '') || (this.state.title === '') || (this.state.category === ''))) {
      this.context.store.dispatch (addPin (this.state.category, this.state.title, this.state.text, this.state.url))
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
        <h2>Add Pin</h2>
        <hr/>
        <div>
          <FilteredInput
            autoFocus={true}
            type='text'
            placeholder='picture (URL)'
            maxLength={512}
            autoCapitalize='none'
            autoCorrect='off'
            onChange={e => {
              this.setState ({url: e.target.value});
            }}/>
          <FilteredInput
            type='text'
            placeholder='category'
            maxLength={20}
            filter={textChars}
            onChange={e => {
              this.setState ({category: e.target.value});
            }}/>
          <FilteredInput
            type='text'
            placeholder='title'
            maxLength={60}
            filter={textChars}
            onChange={e => {
              this.setState ({title: e.target.value});
            }}/>
          <textarea
            placeholder='description'
            maxLength={512}
            rows='5'
            onChange={e => {
              this.setState ({text: e.target.value});
            }}>
          </textarea>
          <button className='dialogButton'
            disabled={(this.state.url === '') || (this.state.category === '')
              || (this.state.title === '') || (this.state.text === '')}
            onClick={this.save}>
            Add Pin
          </button>
        </div>
      </div>
    );
  }
}

AddPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
}
