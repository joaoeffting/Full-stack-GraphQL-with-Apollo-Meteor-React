import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
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

const App = ({ loading, resolutions, removeUser }) => {
    if (loading) return (<div>Loading ... </div>);
    return (
        <div>
            <RegisterForm />
            <LoginForm />
            <ResolutionForm  />
            <button onClick={() => Meteor.logout()}> Logout </button>
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
)(App);