import React from "react";
import Form from "../../../../all/common/form";
import Joi from "joi-browser";
import * as toast from "../../../../all/toast";
import drivingService from "../../../../services/drivingService";
import { Dropdown } from "semantic-ui-react";
import { setHasChanges } from '../../../../globalVariables';
import json from '../../../../json/categories'

class DrivingLicence extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: props.id,
                value: [],
                text: ""
            },
            drivingLicence: [],
            errors: {},
            loading: false,
            options: []
        };
        this.state.drivingLicence = this.props.data;
    }

    schema = {
        id: Joi.string().allow("").optional(),
        text: Joi.string().allow("").optional(),
        value: Joi.array()
    };

    componentDidUpdate() {
        if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
            setHasChanges(true);
        }
        else {
            setHasChanges(false);
        }
    }

    // componentWillReceiveProps(props) {
    //     let { data } = this.state
    //     data = props.data;
    //     this.setState({
    //         data
    //     })
    // }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                value: [].concat(nextProps.data)
            }
        })
    }

    componentDidMount() {
        const { options } = this.state;
        drivingService.get().then(({ data: response }) => {
            let drivingLicence = options;
            response.forEach(licence => {
                drivingLicence.push({ id: "", text: licence.text, value: licence.value });
            });
            this.setState({
                options: drivingLicence,
                drivingLicence: this.props.data
            });
        })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    this.props.history.push("/user-profile");
                }
                toast.error("Something went wrong. Please refresh the page123.");
            });
    }

    submitForm = () => {
        this.setState({
            loading: true
        });

        const { id, value } = this.state.data;
        drivingService
            .put(id, value)
            .then(({ response }) => {
                this.setState({
                    loading: false
                });
                setHasChanges(false);
                toast.success("Successfully edited User.");

            })
            .catch(err => {
                this.setState({
                    loading: false
                });
                toast.error("Something went wrong. Please try again");
            });

    };

    handleChange = (e, { value }) => {
        const { data } = this.state;
        let drivingLicence = [];
        value.forEach(licence => {
            drivingLicence.push(licence);
        });
        data.value = drivingLicence;
        this.setState({
            data
        });
    };

    render() {
        const { loading, drivingLicence } = this.state;
        const { toggleCurrentTab, currentTab } = this.props;

        return (
            <React.Fragment>
                <div className={`edit-info`}>
                    <div className={`edit-info-click ${currentTab === "driving" ? "active" : ""}`} onClick={() => toggleCurrentTab("driving")} >
                        <span>Driving License</span>
                        <img
                            className="arrowImg"
                            onClick={() => toggleCurrentTab("driving")}
                            src="../img/arrow.png"
                            alt=""
                        />{" "}
                    </div>
                    <div
                        className={`edit-info-show ${currentTab === "driving" ? "active" : ""}`}
                    >
                        <form className="skills-form" onSubmit={this.handleSubmit}>
                            <span className="description">Please select which categories you have </span>
                            <Dropdown
                                onChange={this.handleChange}
                                placeholder="Driving License"
                                defaultValue={drivingLicence}
                                defaultOpen={true}
                                fluid
                                multiple
                                search
                                selection
                                options={json.categories}
                            />
                            <div className="form-buttons">
                                {this.renderSubmitButton("Save", loading, "")}
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DrivingLicence;
