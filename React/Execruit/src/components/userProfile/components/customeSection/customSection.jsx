import React, { Component } from "react";
import * as toast from "../../../../all/toast";
import CustomForm from "./customSectionForm";
import customSectionService from "../../../../services/customSectionService"

class CustomSection extends Component {
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
        const { id } = this.state;
        customSectionService.getUserCustomSectionFullHistory(id).then(({ data }) => {
            let allHostories = [];
            if (data.length > 0) {
                allHostories = [].concat(data);
            } else {
                allHostories.push({
                    id: "",
                    user_id: this.props.id,
                    custom_options: "",
                    activity_name: "",
                    city: "",
                    start_month: "",
                    start_year: "",
                    end_month: "",
                    end_year: "",
                    description: "",
                    checkboxToggle: false,
                    show_input_field: ""
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

    addCustomSectionForm = () => {
        const { id } = this.state;
        customSectionService.getUserCustomSectionFullHistory(id).then(({ data }) => {
            let allHostories = [];
            if (data.length > 0) {
                allHostories = [].concat(data);
            }
            allHostories.push({
                id: "",
                user_id: this.props.id,
                custom_options: "",
                activity_name: "",
                city: "",
                start_month: "",
                start_year: "",
                end_month: "",
                end_year: "",
                description: "",
                checkboxToggle: false,
                show_input_field: ""
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
            full_name: "",
            organisation: "",
            phone: "",
            email: "",
            checked: false
        });
        this.setState({
            histories
        });
    };

    onCustomSectionDelete = () => {
        let { histories, id } = this.state;
        customSectionService.getUserCustomSectionFullHistory(id).then(({ data }) => {
            histories = [].concat(data);
            this.setState({ histories });
            if (this.state.histories.length === 0) {
                histories.push({
                    id: "",
                    user_id: this.props.id,
                    custom_options: "",
                    activity_name: "",
                    city: "",
                    start_month: "",
                    start_year: "",
                    end_month: "",
                    end_year: "",
                    description: "",
                    checkboxToggle: false,
                    show_input_field: ""
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
                        className={`edit-info-click ${currentTab === "customsection" ? "active" : ""}`} onClick={() => toggleCurrentTab("customsection")} >
                        <span>Additional Information</span>
                        <div>
                            <img className="arrowImg" onClick={() => toggleCurrentTab("customsection")} src="../img/arrow.png" alt="" />
                        </div>
                    </div>
                    <div className={`edit-info-show ${currentTab === "customsection" ? "active" : ""}`} >
                        {histories.map((history, index) => (
                            <CustomForm
                                key={index}
                                data={history}
                                index={index}
                                id={history.user_id}
                                canAdd={index + 1 === histories.length}
                                addMore={this.addCustomSectionForm}
                                onDelete={this.onCustomSectionDelete} />
                        ))}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CustomSection;
