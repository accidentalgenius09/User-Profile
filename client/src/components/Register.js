import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {registerValidation} from '../helper/validate'
import convertToBase64 from '../helper/convert'

function Register() {

  const[file,setFile] = useState()

    const formik = useFormik({
        initialValues:{
            email:'johndoe@email.com',
            username:'example123',
            password:'admin@123'
        },
        validate:registerValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values=>{
          values = await Object.assign(values,{profile:file || ''})
            console.log(values);
        }
    })

    //formik doesn't support file upload so we need to create this handler

    const onUpload = async e=>{
      const base64 =await convertToBase64(e.target.files[0]);
      setFile(base64)
    }

  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass} style={{width:'40%',height:'98%'}}>
                <div className="title flex flex-col items-center -my-5">
                    <h4 className='font-bold text-5xl'>Register</h4>
                    <span className="py-4 w-2/3 text-xl text-center text-gray-500">
                        Explore more by connecting with us
                    </span>
                </div>
                <form action="" className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <label htmlFor='profile' name='profile'>
                          <img src={file || avatar} alt="avatar" className={styles.profile_img}/>
                        </label>
                        <input type="file" id='profile' onChange={onUpload}/>
                    </div>
                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='johndoe@email.com' />
                        <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='johndoe12' />
                        <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='password@123' />
                        <button type='submit' className={styles.btn}>Register</button>
                    </div>
                    <div className="text-center py-4">
                        <span className='text-gray-500'>Already have an Account? <Link className='text-red-500' to={'/'}>Sign In</Link></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
