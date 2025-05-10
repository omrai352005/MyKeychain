import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Bounce, ToastContainer, Zoom, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const [showpass, setshowpass] = useState(false);
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([]);
    useEffect(() => {
        let password = localStorage.getItem("password");
        if (password) {
            setpasswordArray(JSON.parse(password))
        }

    }, [])

    const handleform = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }
    const handleedit = (site, username, password, id) => {
        if (form.site !== "" || form.username !== '' || form.password !== '') {
            toast.warn('Already a password is  editing', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",


            });
        } else {

            setform({ site: site, username: username, password: password })
            setpasswordArray(passwordArray.filter(item => item.id != id))
            localStorage.setItem('password', JSON.stringify(passwordArray.filter(item => item.id != id)))
        }
    }

    const handledelete = (id) => {
        console.log('deleting row with id ', id)
        if (confirm('Delete this Password Parmanently')) {
            setpasswordArray(passwordArray.filter(item => item.id != id))
            localStorage.setItem('password', JSON.stringify(passwordArray.filter(item => item.id != id)))
            toast.success('Password Deleted Successfully ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
    }

    const handleshowpass = () => {
        setshowpass(!showpass);
    }
    const savePassword = () => {

        if (form.site.length > 3 && form.username.length> 3 && form.password.length > 3) {
            toast.success('Password Added Successfully ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            let uid = uuidv4();
            setpasswordArray([...passwordArray, { ...form, id: uid }])
            localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uid }]))
            setform({ site: "", username: "", password: "" })
            console.log([...passwordArray, form])
        }
        else {
            toast.error('Error, Password not saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }
    return (

        <div className=''>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"


            />
            <div className="absolute inset-0 -z-10 h-full w-full
            bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            </div>
            <div className='mycomponent h-fit  flex flex-col items-center justify-center'>
                <div className="text-3xl font-bold  flex ">
                    <img src="/mekeychain.svg" alt="" className='w-10' />
                    &lt;MyKey
                    <p className="text-purple-900">chain&gt;</p>
                    <img src="/lock.svg" alt="" className='w-10' />
                </div>
                <div className=" "> Your own password manager</div>
                <div className="mycomponent mx-auto  flex flex-col items-center   ">
                    <input value={form.site} onChange={handleform} type="text" name="site" id="url" placeholder="Enter Website Url  " className='w-full  border border-black rounded-2xl  bg-slate-50 px-4 py-1 mt-3' />
                    <div className="flex w-full gap-8">
                        <input value={form.username} onChange={handleform} type="text" name="username" id="name" placeholder='Enter user name' className='w-full border border-black rounded-2xl  bg-slate-50 px-4 py-1 my-3 ' />
                        <div className="password flex justify-center items-center border border-black rounded-2xl  bg-slate-50 h-8 mt-3 ">
                            <input value={form.password} onChange={handleform} type={`${showpass ? 'text' : 'password'}`} name="password" placeholder={`password`} id="password" className='w-full pl-4  h-8 rounded-2xl' />
                            <span onClick={handleshowpass} className='px-2 text-lg cursor-pointer' >{showpass ? <FaEye /> : <FaEyeSlash />}</span>
                        </div>

                    </div>
                    <button onClick={savePassword} className="flex px-4 py-1 bg-purple-400 text-white rounded-lg hover:bg-purple-600 items-center gap-2 hover:cursor-pointer">

                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        <div className="">Add Password</div>
                    </button >


                </div>



            </div>
            <div className="mycomponent flex flex-col items-center">
                <h2 className='text-2xl font-bold py-3 '> Your Passwords</h2>
                <table className="table-auto w-full shadow-lg shadow-purple-500/50 rounded-lg ">
                    <thead className='bg-purple-400 font-bold w-full'>
                        <tr>
                            <th className='py-2 w-[27%] border border-white'>Site</th>
                            <th className='py-2 w-[27%] border border-white'>UserName</th>
                            <th className='py-2 w-[27%] border border-white'>Password</th>
                            <th className='py-2  border border-white'>Edit / Delete</th>
                        </tr>
                    </thead></table>

                {passwordArray.length === 0 && <div className='text-slate-700 text-lg py-4'> No passwords to show</div>}
                {passwordArray.length !== 0 && <div className="h-110 overflow-auto w-full ">
                    <table className="table-auto w-full shadow-lg shadow-purple-500/50 rounded-lg ">


                        <tbody className=' bg-purple-100 w-full '>
                            {
                                passwordArray.map((item, index) => {
                                    return <tr className='' key={index}>
                                        <td className='text-center break-all border border-white py-1 w-[27%]'><a href={item.site} target="_blank">{item.site}</a></td>
                                        <td className='text-center border border-white py-1 w-[27%]'>{item.username}</td>
                                        <td className='text-center border border-white py-1 w-[27%]'>{item.password} </td>
                                        <td className='flex justify-around items-center  py-1'>
                                            <div onClick={() => { handleedit(item.site, item.username, item.password, item.id) }} className="cursor-pointer"> <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                state="hover-line">
                                            </lord-icon></div>
                                            <div onClick={() => { handledelete(item.id) }} className="cursor-pointer"><lord-icon
                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                trigger="hover"
                                            >
                                            </lord-icon></div>
                                        </td>
                                    </tr>
                                })
                            }


                        </tbody>
                    </table></div>
                }

            </div>





        </div>
    )
}

export default Manager
