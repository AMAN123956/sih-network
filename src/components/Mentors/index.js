import React, { useEffect } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import MentorCard from './UI/MentorCard/index'

const Mentors = () => {
    const dummyData = [{
        'name': "Zomato",
        'id': '123456'
    },
    {
        'name': "Swiggy",
        'id': '234567'
    }]
    localStorage.setItem('networkData', JSON.stringify(dummyData))
    const fetchStartupList = async () => {
        const data = await axios.get(`{$url}/api/users`, { userType: 'startup' });

    }
    useEffect(() => {
        fetchStartupList()
    }, []);
    return (
        <div className={styles.container1}>
            {dummyData.map(item => <MentorCard id={item.id} name={item.username} />)}
        </div>
    )
}


export default Mentors
