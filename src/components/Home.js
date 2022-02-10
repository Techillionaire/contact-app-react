import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Home = () => {

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch({type: 'DELETE_CONTACT', payload:id});
    toast.success("Contact deleted successfully!!!");
  };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-12 my-5 text-end'>
                <Link to='/add' className='btn btn-outline-dark'>Add Contact</Link>
            </div>

            <div className='col-md-8 mx-auto text-center'>
              <table className="table table-striped table-hover">
                <thead className="text-white bg-dark text-center">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    contacts.map((c, id) => (
                      <tr key={id}>
                        <th scope="row">{id + 1}</th>
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                        <td>{c.number}</td>
                        <td>
                          <Link to={`/edit/${c.id}`} className='btn me-2 btn-sm btn-primary'>Edit</Link>
                          <button 
                            type='button' 
                            className='btn btn-sm btn-outline-danger'
                            onClick={() => handleDelete(c.id)}
                            >Delete</button>
                        </td>
                      </tr>
                  ))}
                </tbody>

              </table>
            </div>
        </div>
        
    </div>
  )
};

export default Home;
