import React, { Component } from 'react';

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: false
        }
    }

    render() {
        const { onYesClick, onNoClick } = this.props;
        return (
            <React.Fragment>
                <div id={'popup-id'} className={`popup`}>
                    <div className={`popup-inside`}>
                        <div className={`content-popup`}>
                            <span>You have unsaved changes, do you want to continue?</span>
                            <span>Warning: If you click Yes, changes will be lost!</span>
                        </div>
                        <div className={`buttons-popup`}>
                            <button onClick={onYesClick}>Yes</button>
                            <button onClick={onNoClick}>No</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PopUp;
