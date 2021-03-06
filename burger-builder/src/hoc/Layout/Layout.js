import React, { Component } from 'react';
import Aux from '../ReactAux/ReactAux'
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

  state = {
    showSideDrawer: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}></Toolbar>
        <SideDrawer 
          closed={this.sideDrawerClosedHandler}
          opened={this.state.showSideDrawer}></SideDrawer>
        <main className={classes.Container}>
            {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;