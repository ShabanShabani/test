import React, { Component } from "react";
import * as toast from "../../../../all/toast";
import ReferencesForm from "./referencesForm";
import referencesService from "../../../../services/referencesService";

class References extends Component {
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
        referencesService.getUserReferencesFullHistory(id).then(({ data }) => {
            let allHostories = [];
            if (data.length > 0) {
                allHostories = [].concat(data);
            } else {
                allHostories.push({
                    id: "",
                    user_id: this.props.id,
                    full_name: "",
                    organisation: "",
                    phone: "",
                    email: ""
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

    addReferencesForm = () => {
        const { id } = this.state;
        referencesService.getUserReferencesFullHistory(id).then(({ data }) => {
            let allHostories = [];
            if (data.length > 0) {
                allHostories = [].concat(data);
            }
            allHostories.push({
                id: '',
                user_id: this.props.id,
                full_name: "",
                organisation: "",
                phone: "",
                email: "",
                file: ''
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
            file: ''
        });
        this.setState({
            histories
        });
    };

    onReferencesDelete = () => {
        let { histories, id } = this.state;
        referencesService.getUserReferencesFullHistory(id).then(({ data }) => {
            histories = [].concat(data);
            this.setState({ histories });
            if (this.state.histories.length === 0) {
                histories.push({
                    id: "",
                    user_id: this.props.id,
                    full_name: "",
                    organisation: "",
                    phone: "",
                    email: "",
                    file: ''
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
                        className={`edit-info-click ${currentTab === "references" ? "active" : ""}`} onClick={() => toggleCurrentTab("references")} >
                        <span>References</span>
                        <div>
                            <img className="arrowImg" onClick={() => toggleCurrentTab("references")} src="../img/arrow.png" alt="" />
                        </div>
                    </div>
                    <div className={`edit-info-show ${currentTab === "references" ? "active" : ""}`} >
                        {histories.map((history, index) => (
                            <ReferencesForm
                                key={index}
                                data={history}
                                index={index}
                                id={history.user_id}
                                canAdd={index + 1 === histories.length}
                                addMore={this.addReferencesForm}
                                onDelete={this.onReferencesDelete}
                            />
                        ))}
                        <p>Accepted formats (.rtf, .odf, .ods, .gnumeric, .abw, .doc, .txt, .docx, .xls, .xlsx, .pdf) </p> 
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}

export default References;
