import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { onFilterBySearch } = this.props;
        return (
            <React.Fragment>
                <div className="search-input">
                    <input name="filter-search" onKeyUp={onFilterBySearch} type="text" placeholder="Search" />
                    <img src="../img/search.png" alt="" />
                    {/* <span>{filter_search}</span> */}
                </div>
            </React.Fragment>
        );
    }
}

export default SearchBar;