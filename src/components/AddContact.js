import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const AddContact = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();

    const contacts = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.email === email && email);
        const checkNumber = contacts.find(contact => contact.number === parseInt(number));

        if(!email || !number || !name){
            return toast.warning('Please fill in all fields');
        }

        if (checkEmail){
            return toast.error("This email already exists!");
        }

        if (checkNumber){
            return toast.error("This number already exists!");
        }

        const data = {
            id: contacts[contacts.length - 1].id + 1,
            name,
            email,
            number
        }

        dispatch({type: 'ADD_CONTACT', payload:data})
        toast.success("Contact added successfully!!!")
        history("/");
    };
    
    return (
        <div className='container'>
            <div className='row'>
                <h1 className='display-3 my-3 text-center'>Add Contact</h1>

                <div className='col-md-6 shadow mx-auto p-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row mb-3'>
                            <input 
                                type='text' 
                                placeholder='Name' 
                                className='form-control' 
                                name='name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className='row mb-3'>
                            <input 
                                type='email' 
                                placeholder='Email' 
                                className='form-control' 
                                name='email'
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className='row mb-3'>
                            <input 
                                type='number' 
                                placeholder='Phone number' 
                                className='form-control' 
                                name='number'
                                value={number} 
                                onChange={(e) => setNumber(e.target.value)}/>
                        </div>

                        <div className='row mb-3'>
                            <input type='submit' value='Add Contact' className='btn btn-block btn-dark' />
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        )
};

export default AddContact;
