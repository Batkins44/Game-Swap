import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class CurrentTrades extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color='primary'>
          Trades
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Trade Offers Received</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Trade Offers Accepted</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Trade History</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}