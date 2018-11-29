import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from "react-router-dom";
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

const logoutURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signout`;

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto'
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  }
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    console.log(this.props)
    const { classes } = this.props;

    const dropdownList = (
      <div className={classes.fullList}>
        <List>
            <ListItem className={classes.center}>
                <Link to={`/users/${this.props.userInfo.user_id}`}>
                    My Profile
                </Link>
            </ListItem>
            <ListItem className={classes.center}>
                <Link to={`/users/${this.props.userInfo.user_id}/settings`}>
                    Profile Settings
                </Link >
            </ListItem>
            <ListItem className={classes.center}>
                <Link to={logoutURL}>
                    Signout
                </Link>
            </ListItem>
        </List>
      </div>
    );

    const sidebarList = (
      <div className={classes.fullList}>
        <List>
            <ListItem className={classes.center}>
                <Link to='/search'>
                    Search
                </Link>
            </ListItem>
            <ListItem className={classes.center}>
                <Link to='/ProjectList'>
                    My Projects
                </Link >
            </ListItem>
            <ListItem className={classes.center}>
                <Link to='/ReviewList'>
                    My Reviews
                </Link>
            </ListItem>
            <ListItem className={classes.center}>
                <Link to='/Billing'>
                    Billing
                </Link>
            </ListItem>
            <ListItem className={classes.center}>
                <Link to='/settings'>
                    Settings
                </Link>
            </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <ButtonContainer>
            <Button onClick={this.toggleDrawer('top', true)} style={styles.center}>
              <img src='https://cdn2.iconfinder.com/data/icons/lightly-icons/30/chevron-down-480.png' style={{ width: '20px', height: '20px' }} />
            </Button>
        </ButtonContainer>
        <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
          >
            {this.props.dropdown ? {dropdownList} : {sidebarList} }
          </div>
        </Drawer>
      </div>
    );
  }
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userInfo: state.loggedInReducer.userInfo,
  });

export default compose(withStyles(styles), connect(mapStateToProps))(MenuDrawer);
