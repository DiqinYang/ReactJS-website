import React, {  useState } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import EmployeeDataService from '../../services/employee.service';

export default function AddStaff(){
    const initialStaffItemState = {
        firstName : "",
        id:0,
        lastName : "",
        password : "",
        userName : ""
    }

    const [staffItem, setStaffItem] = useState(initialStaffItemState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setStaffItem({ ...staffItem, [name]: value});
    }

    const saveStaff = () =>{
        var data = {
            firstName: staffItem.firstName,
            id: staffItem.id,
            lastName : staffItem.lastName,
            password : staffItem.password,
            userName : staffItem.userName
        };
        EmployeeDataService.create(data);
    }

    return (
        <div>
            <div>
                <TextField name="firstName" label="First Name" onChange={handleInputChange} />
            </div>
            <div>
                <TextField name="id" label="Identiy Number" onChange={handleInputChange} />
            </div>
            <div>
                <TextField name="lastName" label="Last Name" onChange={handleInputChange} />
            </div>
            <div>
                <TextField name="password" label="Password" onChange={handleInputChange} />
            </div>
            <div>
                <TextField name="userName" label="User Name" onChange={handleInputChange} />
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={saveStaff} >Add Employee</Button>
            </div>
        </div>
    )
}