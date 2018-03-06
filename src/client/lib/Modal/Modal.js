import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Row, FlexGroup } from '../Layout';
import { Button } from '../Button';

export class Modal extends Component {
  constructor (props) {
    super (props);
    this.onKeydown = this.onKeydown.bind (this);
  }

  componentDidMount () {
    this.keydown = document.addEventListener ('keydown', this.onKeydown);
  }

  componentWillUnmount () {
    if (this.keydown) {
      document.removeEventListener ('keydown', this.onKeydown);
    }
    if (this.modal) {
      document.body.removeChild (this.modal);
      this.modal = null;
    }
  }

  onKeydown (e) {
    if (this.props.closeAction && (e.keyCode === 27)) {
      this.props.onClose (this.props.closeAction, this.props.tag);
    }
  }

  render () {
    if (! this.modal) {
      this.modal = document.createElement ('div');
      document.body.appendChild (this.modal);
    }

    const content = (
      <Background>
        <Panel>
          { ((this.props.title !== '') || this.props.closeAction) &&
            <Header>
              <Title>{this.props.title}</Title>
              { this.props.closeAction &&
                <Close onClick={() => { this.props.onClose (this.props.closeAction, this.props.tag); }} />
              }
            </Header>
          }
          <Row center pt='24px' pb='24px' pl='16px' pr='16px'>
            {this.props.content}
          </Row>
          { (this.props.actions.length > 0) &&
            <FlexGroup center pb='16px'>
              { this.props.actions.map (action => (
                <Button key={action} onClick={() => { this.props.onClose (action, this.props.tag); }}>
                  {action}
                </Button>
              ))}
            </FlexGroup>
          }
        </Panel>
      </Background>
    );
    return createPortal (content, this.modal);
  }
}

Modal.propTypes = {
  tag: PropTypes.string,
  actions: PropTypes.arrayOf (PropTypes.string),
  closeAction: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  tag: '',
  actions: [],
  closeAction: null,
  title: '',
  onClose () { /* no op */ },
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 100;
`;

const Panel = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 33%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 100px);
  max-width: calc(100% - 100px);
  background-color: white;
  border: 2px solid #222222;
  border-radius: 8px;
  overflow: auto;
  z-index: 101;
`;

const Header = styled.div`
  display: flex;
  padding: 16px 16px 0px 16px;
  overflow: auto;
`;

const Title = styled.div`
  flex: 1 1;
  font-size: 18px;
  padding-right: 10px;
`;

const Close = styled.div`
  margin-left: auto;
  width: 18px;
  height: 18px;
  background:
    linear-gradient(-45deg, transparent 0%, transparent 46%, darkgray 46%, darkgray 56%, transparent 56%, transparent 100%),
    linear-gradient(45deg, transparent 0%, transparent 46%, darkgray 46%, darkgray 56%, transparent 56%, transparent 100%);
  cursor: pointer;
  color: darkgray;
`;
