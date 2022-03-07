import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import StartupCard from "./UI/StartupCard/index";
import { url } from "../../utilities";

const Startup = () => {
    const [error, seterror] = useState(null);
    const [record, setrecord] = useState([{}]);

    // localStorage.setItem('networkData',JSON.stringify(dummyData))


    useEffect(() => {
        const fetchStartupList = async () => {
            console.log('request')
            const data = await axios.get(`${url}/api/startup`);
            console.log(data)
            if (data.data.success) {
                console.log('startup')
                console.log(data.data.data)
                setrecord(data.data.data)
            } else {
                seterror(`${data.error}`);
            }
        }
        fetchStartupList();
    }, []);
    return (
        <div id="container" className={styles.container1}>
            {record.map(item => <StartupCard id={item._id} name={item.name} sector={item.sector} />)}
        </div>
    )
}
export default Startup
// localStorage.setItem('networkData',JSON.stringify(dummyData))

useEffect(() => {
    const fetchStartupList = async () => {
        console.log("request");
        const data = await axios.get(`${url}/api/startup`);
        console.log(data);
        if (data.data.success) {
            console.log(data.data.data);
            setrecord(data.data.data);
        } else {
            seterror(`${data.error}`);
        }
    };
    fetchStartupList();
}, []);
return (
    <div id="container" className={styles.container1}>
        {record.map((item) => (
            <StartupCard id={item.id} name={item.name} />
        ))}
    </div>
);
};
export default Startup;
