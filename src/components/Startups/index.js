import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import StartupCard from "./UI/StartupCard/index";
import { url } from "../../utilities";
import { useHistory } from "react-router-dom";

const Startup = () => {
  const [error, seterror] = useState(null);
  const [record, setrecord] = useState([{}]);
  const history = useHistory();
  // localStorage.setItem('networkData',JSON.stringify(dummyData))

  useEffect(() => {
    const fetchStartupList = async () => {
      try {
        console.log("request");
        const data = await axios.get(`${url}/api/startup`);
        console.log(data);
        if (data.data.success) {
          console.log("startup");
          console.log(data.data.data);
          setrecord(data.data.data);
        } else {
          seterror(`${data.error}`);
        }
      } catch (e) {
        seterror(`${e.error}`);
      }
    };
    fetchStartupList();
  }, []);
  const navigateStartupPage = (e, id) => {
    history.push(`/startup/profile/${id}`);
  };
  return (
    <div id="container" className={styles.container1}>
      {record.map((item) => (
        <StartupCard
          info={item}
          id={item._id}
          navigatePage={navigateStartupPage}
          name={item.name}
          sector={item.sector}
        />
      ))}
    </div>
  );
};
export default Startup;
