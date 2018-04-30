import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Fixed, Relative, Flex } from '../../lib/Layout';
import { DropMenu, MenuBar, MenuNavLink, MenuSeparator } from '../../lib/Menu';

class HeaderBase extends Component {
  constructor (props) {
    super (props);
    this.state = {
      innerWidth: window.innerWidth,
    };

    this.handleResize = this.handleResize.bind (this);
  }

  componentDidMount () {
    window.addEventListener ('resize', this.handleResize);
  }

  componentWillUnmount () {
    window.removeEventListener ('resize', this.handleResize);
  }

  handleResize () {
    this.setState (() => ({ innerWidth: window.innerWidth }));
  }

  render () {
    return (
      <Container>
        <Content>
          { this.props.menu && this.props.authenticated && (this.state.innerWidth < 320) &&
            <DropMenu m='10px 8px 0 4px'>
              <MenuNavLink to='/' exact>Home</MenuNavLink>
              <MenuNavLink to='/pinned'>Pinned</MenuNavLink>
              <MenuNavLink to='/manage'>Manage</MenuNavLink>
              <MenuNavLink to='/about'>About</MenuNavLink>
              <MenuSeparator spacing='4px' />
              <MenuNavLink to='/logout'>Logout</MenuNavLink>
            </DropMenu>
          }
          { this.props.menu && (! this.props.authenticated) && (this.state.innerWidth < 320) &&
            <DropMenu m='10px 8px 0 4px'>
              <MenuNavLink to='/' exact>Home</MenuNavLink>
              <MenuNavLink to='/about'>About</MenuNavLink>
              <MenuSeparator spacing='4px' />
              <MenuNavLink to='/register'>Register</MenuNavLink>
              <MenuNavLink to='/login'>Login</MenuNavLink>
            </DropMenu>
          }
          <Title>Pinster</Title>
          { this.props.menu && this.props.authenticated && (this.state.innerWidth >= 320) &&
            <Flex>
              <MenuBar mt='12px'>
                <MenuNavLink to='/' exact>Home</MenuNavLink>
                <MenuNavLink to='/pinned'>Pinned</MenuNavLink>
                <MenuNavLink to='/manage'>Manage</MenuNavLink>
                <MenuNavLink to='/about'>About</MenuNavLink>
              </MenuBar>
              <MenuBar right mt='12px'>
                <MenuNavLink to='/logout'>Logout</MenuNavLink>
              </MenuBar>
            </Flex>
          }
          { this.props.menu && (! this.props.authenticated) && (this.state.innerWidth >= 320) &&
            <Flex>
              <MenuBar mt='12px'>
                <MenuNavLink to='/' exact>Home</MenuNavLink>
                <MenuNavLink to='/about'>About</MenuNavLink>
              </MenuBar>
              <MenuBar right mt='12px'>
                <MenuNavLink to='/register'>Register</MenuNavLink>
                <MenuNavLink to='/login'>Login</MenuNavLink>
              </MenuBar>
            </Flex>
          }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
});

export const Header = connect (mapStateToProps, null, null, { pure: false }) (HeaderBase);

HeaderBase.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  menu: PropTypes.bool.isRequired,
};

export const Container = styled (Fixed)`
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colorPrimary || '#7AC1C1;'};
`;

export const Content = styled (Relative)`
  max-width: 768px;
  margin: 0 auto;
  height 72px;

  @media (max-width: 300px) {
    height: 40px;
  }
`;

export const Title = styled.div`
  font-family: 'Arizonia', sans-serif;
  font-size: 30px;
  display: inline-block;
  vertical-align: top;
  margin: 8px 0 0 0;
  text-shadow: 2px 2px 2px #FFFFFF;
  line-height: 1.0;
`;
