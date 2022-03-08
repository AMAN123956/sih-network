import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import { url } from '../../utilities'
import EntrepreneurCard from './UI/EntrepreneurCard'

const Entrepreneur = () => {
    const [error, seterror] = useState(null);
    const [record, setrecord] = useState([{}])

    useEffect(() => {
        const fetchEntrepreneurList = async () => {
            const data = await axios.get(`${url}/api/entrepreneur`);
            if (data.data.success) {
                setrecord(data.data.data)
            } else {
                seterror(`${data.error}`);
            }
        }
        fetchEntrepreneurList();
    }, []);
    return (
        <div id="container" className={styles.container1}>
            {record.map(item => <EntrepreneurCard id={item._id} name={item.name} sector={item.sector} />)}
        </div>
    )
}

export default Entrepreneur