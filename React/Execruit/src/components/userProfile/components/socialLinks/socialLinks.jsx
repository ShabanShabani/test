import React, { Component } from "react";
import * as toast from "../../../../all/toast";
import SocialLinkForm from "./socialLinkForm";
import socialLinksService from "../../../../services/socialLinksService";


class SocialLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            histories: [],
            errors: {},
            loading: false
        };
    }

    componentDidMount() {
        this.getSocialLinks()
    }

    getSocialLinks = () => {
        const { id } = this.state;
        socialLinksService.getSocialLink(id).then(({ data }) => {
            let allHostories = [];
            if (data.length > 0) {
                allHostories = [].concat(data);
            } else {
                allHostories.push({
                    id: "",
                    user_id: this.props.id,
                    social_web: "",
                    social_link: ""
                });
            }
            this.setState({
                histories: allHostories
            });
        })
        .catch(() => {
            toast.error("Something went wrong. Please refresh the page.");
        });
    }
    addSocialLinkForm = () => {
        const { id } = this.state;
        socialLinksService.getSocialLink(id).then(({ data }) => {
            let allHostories = [];
            if (data.length > 0) {
                allHostories = [].concat(data);
            }
            allHostories.push({
                id: "",
                user_id: this.props.id,
                social_web: "",
                social_link: ""
            });
            this.setState({
                histories: allHostories
            });
        })
            .catch(() => {
                toast.error("Something went wrong. Please refresh the page.");
            });
        const { histories } = this.state;
        histories.push({
            id: "",
            user_id: this.props.id,
            social_web: "",
            social_link: ""
        });
        this.setState({
            histories
        });
    };

    onSocialLinkDelete = () => {
        let { histories, id } = this.state;
        socialLinksService.getSocialLink(id).then(({ data }) => {
            histories = [].concat(data);
            this.setState({ histories });
            if (this.state.histories.length === 0) {
                histories.push({
                    id: "",
                    user_id: this.props.id,
                    social_web: "",
                    social_link: ""
                });
                this.setState({ histories });
            }
        });
    };

    render() {
        const { toggleCurrentTab, currentTab } = this.props;
        const { histories } = this.state;
        return (
            <React.Fragment>
                <div className={`edit-info`}>
                    <div
                        className={`edit-info-click ${currentTab === "social-link" ? "active" : ""}`} onClick={() => toggleCurrentTab("social-link")} >
                        <span>Social Links</span>
                        <div>
                            <img className="arrowImg" onClick={() => toggleCurrentTab("social-link")} src="../img/arrow.png" alt="" />
                        </div>
                    </div>
                    <div className={`edit-info-show ${currentTab === "social-link" ? "active" : ""}`} >
                        {histories.map((history, index) => (
                            <SocialLinkForm
                                key={index}
                                data={history}
                                index={index}
                                id={history.user_id}
                                canAdd={index + 1 === histories.length}
                                addMore={this.addSocialLinkForm}
                                onDelete={this.onSocialLinkDelete}
                                getSocialLinks={this.getSocialLinks}
                            />
                        ))}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SocialLink;
