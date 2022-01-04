import React from 'react';
import { useQuery, gql } from '@apollo/client';
import AddUser from './AddUser';

function DisplayUsers() {

  const getUsers = gql`
    query getUsers {
      users {
        id
        name
        username
        age
        nationality
      }
    }
  `;
  const { loading, error, data } = useQuery(getUsers);

  if(loading) {
    return (<p>Loading ...</p>);
  }

  if(error) {
    return (<p>{error}</p>);
  }

  return (
    <div>
      <AddUser/>
      { data.users && data.users.map(user => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.age}</p>
          <p>{user.nationality}</p>
          <br/>
          <hr/>
          <br/>
        </div>
      )) }
    </div>
  )
}

export default DisplayUsers
