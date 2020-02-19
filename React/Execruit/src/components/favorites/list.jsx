import React, { Component } from 'react';
import LisComponent from './listComponent';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropActive: false,
            data: [],
            value: ''
        };
        this.state.data = this.props.users;
    }

    componentDidMount(){
        this.handleSearchScrollJobs();
    }

    handleSearchScrollJobs = () => {
        const ref = this.refs.usersScroll
        ref.addEventListener("scroll", () => {
            console.log("Scrooll")
            if (ref.scrollTop + ref.clientHeight >= ref.scrollHeight) {
                this.props.getUsers();
            }
        });
    }
    // dropdownClick = (e) => {
    //     if (!e.target.parentNode.parentNode.className.includes('open')) {
    //         e.target.parentNode.parentNode.className += ' open'
    //         e.target.parentNode.parentNode.parentNode.parentNode.parentNodeclassName += ' zIndexUser'
    //     } else {
    //         e.target.parentNode.parentNode.className = 'download-img'
    //     }
    // }
    render() {
        const { isToggleList, dropdownClick, users, company } = this.props;
        const { dropActive } = this.state;
        return (
            <React.Fragment>
                <div ref="usersScroll" className={`list ${isToggleList === 'list' ? "on" : "off"}`}>
                    <div className={`top-list`}>
                        <div className="top-list-name">
                            <span>Emri</span>
                        </div>
                        <div className="top-list-name">
                            <span>Email</span>
                        </div>
                        <div className="top-list-name">
                            <span>Profili</span>
                        </div>
                        {company === 'comp' ?
                            ''
                            :
                            <div className="top-list-name">
                                <span>Resume</span>
                            </div>
                        }
                    </div>
                    <div>
                        {users.map((user, index) =>
                            <LisComponent
                                indexKey={index}
                                key={index}
                                user={user}
                                dropActive={dropActive}
                                dropdownClick={dropdownClick}
                                company={company}
                            />
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default List;
