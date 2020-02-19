import React, { Component } from 'react';

class SearchBar1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.state.data = this.props.users;
    }
    render() {
        const { handleChangeOne, handleChange } = this.props;

        return (
            <React.Fragment>
                <div className="search-input">
                    <input type="text" onChange={handleChange} />
                    <img onClick={handleChangeOne} src="../img/search.png" alt=""/>
                </div>
            </React.Fragment>
        );
    }
}

export default SearchBar1;