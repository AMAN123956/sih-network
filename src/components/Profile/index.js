import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { url } from '../../utilities';
const Profile = () => {
    const [name, setname] = useState(null)
    const [email, setemail] = useState(null)
    const [error, seterror] = useState(null);
    const [imgurl, setimgurl] = useState(null)
    const [industry, setindustry] = useState(null)
    // const [message, setmessage] = useState(null);
    const history = useHistory();
    const userInfoFromStorage = localStorage.getItem("startupUserInfo")
        ? JSON.parse(localStorage.getItem("startupUserInfo"))
        : null;
    console.log('userInfo12345')
    console.log(userInfoFromStorage)
    useEffect(() => {
        if (userInfoFromStorage) {
            const getData = async () => {
                try {
                    console.log('request made')
                    const { data } = await axios.get(`${url}/api/${userInfoFromStorage.userType}/${userInfoFromStorage.id}`);
                    console.log('profileData')
                    console.log(data);
                    if (data && data.success) {
                        setname(data.data.name);
                        setemail(data.data.email);
                        setindustry(data.data.industry)
                        if (data.data.image)
                            setimgurl(data.data.image);
                        else setimgurl('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png')
                    } else {
                        seterror(`${data.error}`);
                    }
                }
                catch (e) {
                    seterror(`${e.error}`)
                }
            };
            getData();
        }

        else {
            alert('ty')
            history.push('/login')
        }

    }, [])
    return (
        <div className={`shadow ${styles.container1}`}>
            <div className={styles.section1}>
                <div className={styles.left}>
                    <img src={imgurl} alt="profile_img" />
                </div>
                <div className={styles.right}>
                    <h2 className={styles.profileName}>{name}</h2>
                    <h3 className={styles.industryText}>{industry}</h3>
                </div>
            </div>
        </div>
    )
}

export default Profile