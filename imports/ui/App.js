import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo';
import ResolutionForm from './ResolutionForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const deleteUser = (userId, removeUser) => {
    removeUser({
        variables: {
            id: userId
        }
    })
}

const App = ({ loading, resolutions, removeUser, client, user }) => {
    if (loading) return (<div>Loading ... </div>);
    return (
        <div>
            {
                user._id ? 
                <button 
                    onClick={() => {
                        Meteor.logout();
                        client.resetStore();
                    }}
                > 
                    Logout 
                </button> :
                    [
                        <RegisterForm key="register-form" resetStore={client.resetStore} />,
                        <LoginForm key="login-form" resetStore={client.resetStore} />
                    ]

            }
            <ResolutionForm  />
            <ul>
                {
                    resolutions.map(resolution => (
                        <li 
                            key={resolution._id}
                        >
                            {resolution.name}<button onClick={() => deleteUser(resolution._id, removeUser)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};

const resolutionsQuery = gql`
    query Resolutions {
        resolutions {
            _id,
            name
        }
        user {
            _id
        }
    }
`;

const REMOVE_USER = gql`
mutation removeUser($id: String!) {
    removeUser(id: $id) {
        _id
        name
    }
}
`;

export default compose(
    graphql(resolutionsQuery, {
        props: ({ data }) => ({ ...data })
    }), 
    graphql(REMOVE_USER, { 
            name: 'removeUser',
            options: {
                refetchQueries: [
                    'Resolutions'
                ]
            }
        })
)(withApollo(App));