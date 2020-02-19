// import React, { Component } from 'react';
// import profileService from '../../services/profileService';
// import FilterResults from 'react-filter-search';

// class Search extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: {
//                 username: '',
//                 email: ''
//             },
//             value: ''
//         };
//         this.state.data = this.props.users
//         // this.handleChange = this.handleChange.bind(this);
//     }

//     componentWillMount() {
//         const { users } = this.props;
//     }

//     handleChange = event => {
//         const { value } = event.target;
//         this.setState({ value });
//     };

//     render() {

//         const { data, value } = this.state;

//         return (
//             <div className="search-barrr">
//                 <input type="text" value={value} onChange={this.handleChange} />
//                 <FilterResults
//                     value={value}
//                     data={data}
//                     renderResults={results => (
//                         <div>
//                             {results.map(user => (
//                                 <div>
//                                     <span>{user.username} {user.email}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 />
//             </div>
//         );
//     }
// }

// export default Search;