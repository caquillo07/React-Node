import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' }
];


class SurveyForm extends Component {

    renderFields() {
        return _.map(FIELDS, ({name, label}) => {
            return <Field component={SurveyField} type="text" name={name} label={label} key={name}/>
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">
                            done
                        </i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
     const errors = {};

     _.forEach(FIELDS, ({ name }) => {
         if (!values[name]) {
             errors[name] = `You must provide a value`;
         }
     });

     return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);
