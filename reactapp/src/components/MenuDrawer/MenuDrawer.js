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

const logoutURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signout`;

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
    text-align: 'center';
  },
};

class MenuDrawer extends React.Component {
  state = {
    top: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const fullList = (
      <div className={classes.fullList}>
        <List>
            <ListItem>
                <Link to={`/users/${this.props.userInfo.user_id}`}>
                    My Profile
                </Link>
            </ListItem>
            <ListItem>
                <Link to={`/users/${this.props.userInfo.user_id}/settings`}>
                    Profile Settings
                </Link >
            </ListItem>
            <ListItem>
                <Link to={logoutURL}>
                    Signout
                </Link>
            </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
        <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
          >
            {fullList}
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
  
//   export default connect(
//     mapStateToProps
//   )(DropDown);

// export default withStyles(styles)(MenuDrawer);

export default compose(withStyles(styles), connect(mapStateToProps))(MenuDrawer);
