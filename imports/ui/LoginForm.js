import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class LoginForm extends Component {
    loginUser = (e) => {
        e.preventDefault();
        Meteor.loginWithPassword(this.email.value, this.password.value, (error) => {
            if (!error)
                this.props.resetStore();
        });
    }
    render() {
        return (
            <form 
                onSubmit={this.loginUser}
            >
                <input 
                    type="email" 
                    ref={(input) => this.email = input}
                />

                <input 
                    type="password" 
                    ref={(input) => this.password = input}
                />

                <button type="submit">
                    Login
                </button>
            </form>
        )
    }
}