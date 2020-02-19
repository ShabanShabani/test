import React, { Component } from 'react';
import { Tooltip } from 'reactstrap'

class MyTooltip extends Component {
    state = {
        tooltipOpen: false
    }

    toggle = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render() {
        const { name, message } = this.props;
        return (
            <React.Fragment>
                <span href='#' id={`${name}-tooltip`} className='tooltip-span' style={{ marginLeft: 5 }}><i className="fa fa-info-circle"></i></span>
                <Tooltip isOpen={this.state.tooltipOpen} toggle={this.toggle} placement='bottom' target={`${name}-tooltip`}>{message}</Tooltip>
            </React.Fragment>
        );
    }
}

export default MyTooltip;