import React, { Component } from 'react';

class EditCompopnentProfile extends Component {
    state = {
        editTab: " "
    }

    onClick = (tab) => {
        this.props.history.push({
            pathname: '/edit-user-profile',
            state: {
                tab: tab
            }
        })
    }

    render() {
        const { tab } = this.props;
        return (
            <div onClick={this.onClick.bind(this, tab)} >
                <img src="../img/pen.png" alt="" />
            </div>
        );
    }
}

export default EditCompopnentProfile;