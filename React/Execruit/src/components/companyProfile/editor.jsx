import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class TextEditor extends Component {
    constructor(props, value) {
        super(props);
        this.state = {
            text: "",
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
        this.props.sendData(value);
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    componentWillReceiveProps(newProps) {
        this.setState({
            text: newProps.description
        })
    }

    render() {
        let value = this.state.text
        if (this.props.value)
            value = this.props.value

        const place = "JOB BRIEF:\n - We are looking for talented Branch Managers to assign and direct all work performance in the branch and to supervise all areas of operations. \nMAIN DUTIES AND RESPONSIBILITES:\n - Direct all operational aspects of the branch including sales, customer service, human resources and administration.\n - Assess local market conditions and identify current and prospective business development opportunities. \nSKILLS AND QUALIFICATIONS:\n - Proven management experience.\n - Results driven and customer focused.\n - Good understanding and knowledge of local market.\nWORKING HOURS\n - Full Time/Temporary.\n - SALARY\n"
        return (
            <div className="text-editor">
                <ReactQuill
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    value={value}
                    onChange={this.handleChange}
                    placeholder={place}
                />
            </div>
        );
    }
}

export default TextEditor;