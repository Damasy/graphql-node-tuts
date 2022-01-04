import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';

const getNationalitiesLookup = gql`
query {
  __type(name: "Nationality") {
    enumValues {
      name
    }
  }
}
`;

const _createUser = gql`
  mutation createUser($input: createUserInput) {
    createUser(user: $input) {
      username
      name
      age
      nationality
    }
  }
`;

function AddUser() {

  // Create User States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const [ addUser ] = useMutation(_createUser,{
      onCompleted(res){
          // do someting
          console.log(res, 'completed');
      },
      onError(error){
          // do something
          console.log(error, 'error');
      }
  });

  const fuckUser = () => {
    const _user = { name, username, age: Number(age), nationality };
    const vars = {
      "variables": {
        "user": JSON.parse(JSON.stringify(_user))
      }
    }
    console.log(vars);
    addUser(vars)
  }

  const { data: nationalities } = useQuery(getNationalitiesLookup);

  return (
    <div>
      <input
        type="text"
        placeholder="Name..."
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <br/>
      <br/>
      <input
        type="text"
        placeholder="Username..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <br/>
      <br/>
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setAge(event.target.value);
        }}
      />
      <br/>
      <br/>
      <select defaultValue={'placeholder'}
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}>
        <option value={'placeholder'} disabled>Please select nationality</option>
        {nationalities && nationalities.__type.enumValues.map(n => (
          <option key={n.name} value={n.name}>{n.name}</option>
        ))}
      </select>
      <br/>
      <br/>
      <button onClick={() => fuckUser()}
      >
        Add User
      </button>
    </div>
  )
}

export default AddUser
