import { useRef, useState, useEffect} from 'react';
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LOGIN_URL = '/auth/sign-in';

const Login = () => {
   const { setAuth } = useAuth()

   const navigate = useNavigate()
   const location = useLocation()
   console.log(location)
   const from = location.state?.from?.pathname || '/'
    
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])


    const user = { 
        email:email,
        password:pwd
    }
    console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
               JSON.stringify(user),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                         accept:'*/*'
             },
                    // withCredentials: true,
                   
                }
            );
            console.log(response?.data);
           
       
            const accessToken = response?.data?.data?.accessToken;
            const roles = ['admin','editor','user','logger']
            setAuth({user, roles, accessToken });
            setEmail('')
            setPwd('');
            // setSuccess(true);
            navigate(from,{replace:true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing parameter');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }



  return (
   <>
    <section>
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    <h1>Sign In</h1>
    <form onSubmit = {handleSubmit} >
        <label htmlFor="email">Email:</label>
        <input
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
        />

        <label htmlFor="password">Password:</label>
        <input
            type="text"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
        />
        <button 
        disabled = { !email || !pwd ? true : false}
        >Sign In</button>
    </form>
    <p>
        Need an Account?<br />
        <span className="line">
            {/*put router link here*/}
            <Link to='/register'>Sign Up</Link>
        </span>
    </p>
</section>
</>
  );
}

export default Login;
