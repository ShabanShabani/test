import React, { Component } from 'react';
import LeftMenu from "../left-menu/left-menu";
import NavBar from '../nav-bar/nav-bar';
import LeftCompany from '../companyProfile/leftMenuCompany/leftMenu';
import JobsBox from '../posts/jobs-box';
import createPostService from '../../services/createPostService';
import * as toast from '../../all/toast';
import companyService from '../../services/companyService';

class CompanyInfo extends Component {
    constructor(props) {
        super(props);

        const { params } = props.match;
        if (!params.id) props.history.push('/user-profile');

        this.state = {
            data: {
                id: '',
                nvi: '',
                phone_number: '',
                name: '',
                industry: '',
                country: '',
                city: '',
                address: '',
                postal_code: '',
                profile_picture: '',
                email: '',
                summary: ''
            },
            company_id: this.props.match.params.id,
            posts: [],
            favorites: [],
            isActive: false,
            isToggleOn: true,
            isToggleOnMobile: true,
            test: 'test',
            toggleCompany: 'post',
            post_id: ''
        };
    }

    componentDidMount() {
        const { company_id } = this.state;
        this._isMounted = true;
        companyService.getUserCompany(company_id).then(({ data: response }) => {
            this.setState({
                data: response
            })
        }).catch(err => {
            toast.error('Something went wrong. Please refresh the page.')
        })
        createPostService.viewCompanyProfilePosts(company_id).then(({ data: response }) => {
            this.setState({
                posts: [].concat(response)
            })
        }).catch(err => {
            toast.error('Something went wrong. Please refresh the page.')
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleLeftMenu = () => {
        this.setState({
            isToggleOn: !this.state.isToggleOn
        });
    };

    toggleFilter = () => {
        this.setState({
            isFilterOn: !this.state.isFilterOn
        });
    };

    toggleLeftMenuMobile = () => {
        this.setState({
            isToggleOnMobile: !this.state.isToggleOnMobile
        });
    };

    toggleCompanyProfile = (toggleCompany) => {
        this.setState({
            toggleCompany: toggleCompany
        })
    }

    onEditPost = (toggleCompany, id) => {
        this.setState({
            toggleCompany: toggleCompany,
            post_id: id
        })
    }

    render() {
        const { isToggleOn, isToggleOnMobile, data, toggleCompany, posts, company_id } = this.state;
        return (
            <React.Fragment>
                <NavBar
                    toggleLeftMenu={this.toggleLeftMenu}
                    isToggleOn={isToggleOn}
                />
                <LeftMenu
                    toggleLeftMenu={this.toggleLeftMenu}
                    isToggleOn={isToggleOn}
                    toggleLeftMenuMobile={this.toggleLeftMenuMobile}
                    isToggleOnMobile={isToggleOnMobile}
                />
                <div className={` jobs ${isToggleOn ? '' : 'active'}`}>
                    <div className={`main-information`}>
                        <LeftCompany
                            data={data}
                            company_id={company_id}
                        />
                        <div className={`right-part`}>
                            <div className={`my-posts ${toggleCompany === 'post' ? '' : 'displayNone'}`}>
                                {posts.length === 0 ?
                                    <span className="notFound" >This company has no Job Post yet!</span>
                                    :
                                    <JobsBox
                                        posts={posts}
                                        myPost="myPost"
                                        onEditPost={this.onEditPost}
                                        company_id={company_id}
                                        currentTab="post"
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CompanyInfo;