import React,{ useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

const EditContact = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();

    const {id} = useParams();
    const contacts = useSelector(state=>state)
    const currentContact = contacts.find(contact => contact.id === parseInt(id));
    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(()=>{
        if(currentContact){
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
    }, [currentContact])

    const handleEdit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.id !== id && contact.email === email && email);
        const checkNumber = contacts.find(contact => contact.id !== id && contact.number === parseInt(number));

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
            id: parseInt(id),
            name,
            email,
            number
        }

        dispatch({type: 'UPDATE_CONTACT', payload:data})
        toast.success("Contact updated successfully!!!")
        history("/");
    };

  return (
    <div className='container'>
        {
            currentContact ? (
                <>
                    <h1 className='display-3 my-3 text-center'>Edit Contact {id}</h1>
                    <div className='row'>
                        <div className='col-md-6 shadow mx-auto p-5'>
                            <form onSubmit={handleEdit}>
                                <div className='row mb-3'>
                                    <input 
                                        type='text' 
                                        placeholder='Name' 
                                        className='form-control'
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                    />
                                </div>

                                <div className='row mb-3'>
                                    <input 
                                        type='email' 
                                        placeholder='Email' 
                                        className='form-control' 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='row mb-3'>
                                    <input 
                                        type='number' 
                                        placeholder='Phone number' 
                                        className='form-control' 
                                        value={number} 
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                </div>

                                <div className="btn-toolbar justify-content-between">
                                    <input type='submit' value='Update Contact' className='btn btn-primary' />
                                    <Link to='/'className='btn btn-outline-danger' >Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                
                </>
            ) : (
                <h3 className='display-3 m-5 text-center'>Contact with Id {id} does not exist</h3>
            )
        }
        
        
    </div>
)};

export default EditContact;
