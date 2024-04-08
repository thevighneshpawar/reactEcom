import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import { useEcom } from '../../context/EcomContext';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { fireDB } from '../../firebase/FirebaseConfig';


function ProfileInfo() {
   
const userData = localStorage.getItem('user');
const userObject = JSON.parse(userData);

  let localuid = userObject.user.uid;

    let user = useEcom();
    const users  = user.user
    const matchedUser = users.find(user => user.uid === localuid);
    return (
        <Layout>
            <div className='container p-4'>
                <div className="info-div bg-gray-100 p-4">
                    <div className='w-full'>
                      <h4 className='text-black font-bold text-xl'>Name</h4>  
                      <div className='my-5 py-3 pl-2 bg-slate-200 rounded-md w-2/3'>
                      <span>
                        {matchedUser.name}
                       
                      </span>
                      </div>
                      <h4 className='text-black font-bold text-xl'>Email</h4>
                      <div className='my-5 py-3 pl-2 bg-slate-200 rounded-md w-2/3'>
                      <span>{userObject.user.email}</span>
                      </div>
                     <h4>Change Password </h4>
                    </div>

                </div>

            </div>

        </Layout>
        
    )
}

export default ProfileInfo
