import React,{useEffect} from 'react'
import { useHistory } from "react-router-dom";
import styles from './styles.module.css'
import Filter from '../Filter/index'
import NetworkTab from '../Tabs/index'
let profileImgUrl='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png';
function Home() {
    const history = useHistory();
    const localData = localStorage.getItem("startupUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;
    
    if(userInfo && userInfo.image) profileImgUrl = userInfo.image
    const handleProfileClick = () =>{
        console.log('profile data')
        history.push('/myprofile')
    }

    useEffect(() => {
        console.log(userInfo)
        if (!userInfo) {
            history.push("/register");
        }
    }, [])
    return (
        <div className={styles.container1}>
            <div className={styles.section1}>
                <h2>Network</h2>
                {userInfo ? (<button className={styles.profileBtn} 
                onClick={handleProfileClick}><img src={profileImgUrl} alt="profile_img"/>{userInfo.name}</button>) : null }
                
            </div>
            <div className={styles.section2}>
                <div className={styles.leftSection}>
                    <Filter />
                </div>
                <div className={styles.rightSection}>
                <NetworkTab />    
                </div>
            </div>
        </div>
    )
}

export default Home