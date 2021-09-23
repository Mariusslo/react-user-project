import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import styles from './AddUser.module.css';

const AddUser = props => {
    const [enteredUsername, setEnteredUsername] = useState('');    
    const [enteredAge, setEnteredAge] = useState('');    
    const [error, setError] = useState();
    
    const addUserHandler = (event) => {
        event.preventDefault();

        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title: 'Invalid Input',
                message: 'Please entered a valid name & age!'
            })
            return;
        }
        if(+enteredAge < 1) {
            setError({
                title: 'Invalid Age',
                message: 'Please entered a valid age!'
            })
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
    }

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    };

    const errorHandler = () => {
        setError(null);
    }
    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={styles.input} type={props.type}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username" >Username:</label>
                    <input id="username" value={enteredUsername} type="text" onChange={usernameChangeHandler} />
                    <label htmlFor="age" >Age:</label>
                    <input id="age" value={enteredAge} type="number" onChange={ageChangeHandler} />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
}

export default AddUser;