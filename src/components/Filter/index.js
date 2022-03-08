import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import { Form, Button } from 'react-bootstrap';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import { url } from '../../utilities'
const states = State.getStatesOfCountry('IN')
const cities = City.getCitiesOfCountry('IN')

const Filter = () => {
    let [industry, updateIndustry] = useState([]);
    let [sector, updateSector] = useState([]);
    let [state, updateState] = useState([])
    const [userType,setUserType] = useState('entrepreneur')
    const [searchQuery, setQuery] = useState(null)
    let sectorFilterTodos = [];
    let industryFilterTodos = [];
    let stateFilterTodos = [];
    const fetchData = () => {
    }

    const industryFilter = (e) => {
        

        if (industry.includes(e.target.value)) {
            industryFilterTodos = industry.filter((t) => t !== e.target.value);
            localStorage.setItem("industry", JSON.stringify(industryFilterTodos));
            updateIndustry(industryFilterTodos)
        }
        else {
            industryFilterTodos = [...industry];
            industryFilterTodos.push(e.target.value);
            localStorage.setItem("industry", JSON.stringify(industryFilterTodos));
            updateIndustry(industryFilterTodos)
        }
        fetchData();
    }


    const sectorFilter = (e) => {
     
        if (sector.includes(e.target.value)) {
            sectorFilterTodos = sector.filter((t) => t !== e.target.value);
            localStorage.setItem("sector", JSON.stringify(sectorFilterTodos));
            updateSector(sectorFilterTodos)
        }
        else {
            sectorFilterTodos = [...sector];
            sectorFilterTodos.push(e.target.value);
            localStorage.setItem("sector", JSON.stringify(sectorFilterTodos));
            updateSector(sectorFilterTodos)
        }
        fetchData();
    }

    const stateFilter = (e) => {
        if (state.includes(e.target.value)) {
            stateFilterTodos = sector.filter((t) => t !== e.target.value);
            localStorage.setItem("state", JSON.stringify(stateFilterTodos));
            updateState(stateFilterTodos)
        }
        else {
            stateFilterTodos = [...state];
            stateFilterTodos.push(e.target.value);
            localStorage.setItem("state", JSON.stringify(stateFilterTodos));
            updateState(stateFilterTodos)
        }
    }

    function speakMsg(info) {
        let msg = new SpeechSynthesisUtterance();
        let voices = window.speechSynthesis.getVoices();
        msg.voice = voices[1];
        msg.volume = 1; // From 0 to 1
        msg.rate = 0.8; // From 0.1 to 10
        msg.pitch = 1; // From 0 to 2
        speechSynthesis.cancel();
        msg.lang = "english";
        msg.text = info
        speechSynthesis.speak(msg)
    }

    useEffect(() => {
        speakMsg('Press 1 To Search for an Entrepreneur Details, Press 2 To Search For a Startup Details, Press 3 To Search For Investor Details , Press 4 To Cancel The Audio')
    }, [])

    useEffect(() => {
        async function listener(event) {
            const searchField = document.getElementById('searchField')
            if (searchField.value === '') {
                if (event.code === 'Digit1') {
                    setUserType('entrepreneur')
                    speakMsg('Enter Name of Entrepreneur , you want to search for');
                    setTimeout(() => {
                        searchField.value = ''
                        searchField.focus()
                    }, 1000)
                    document.removeEventListener('keydown', listener)
                }
                if (event.code === 'Digit2') {
                    setUserType('startup')
                    speakMsg('Enter Name of Startup , you want to search for');
                    setTimeout(() => {
                        searchField.value = ''
                        searchField.focus()
                    }, 1000)
                    document.removeEventListener('keydown', listener)
                }
                if (event.code === 'Digit3') {
                    setUserType('investor')
                    speakMsg('Enter Name of Investor , you want to search for');
                    setTimeout(() => {
                        searchField.value = ''
                        searchField.focus()
                    }, 1000)
                    document.removeEventListener('keydown', listener)
                }
                if (event.code === 'Digit4') {
                    speakMsg('');
                    localStorage.setItem('homeAudio',false);
                    document.removeEventListener('keydown', listener)
                }
               
            }
            
            if(event.code === 'ControlLeft'){
                const data = await axios.get(`${url}/api/${userType}/?name=${searchField.value}`)
            }

             
           
        }
        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }

    }, [searchQuery])


    return (
        <div className={`${styles.container1} shadow`}>
            <div className={styles.section1}>
                <h2 className={styles.filterHeading}>
                    Filter
                </h2>
            </div>
            <div className={styles.section2}>
                <form>
                    <input type='text' id='searchField' className={styles.searchField} value={searchQuery} onChange={(e) => setQuery(e.target.value)} />
                </form>
                <Accordion>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton className={styles.accordionBtn}>
                                Industry
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={industryFilter} label="Advertising" value="advertising" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={industryFilter} label="Agriculture" value="agriculture" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={industryFilter} label="Aeronautics ,Defence" value="defence" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={industryFilter} label="Ai" value="ai" />
                            </Form.Group>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton className={styles.accordionBtn}>
                                Sector
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={sectorFilter} label="Adtech" value="adtech" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={sectorFilter} label="Defence Equipment" value="defence" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={sectorFilter} label="Drones" value="drones" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={sectorFilter} label="Online Classified" value="classified" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={sectorFilter} label="Space Technology" value="space" />
                            </Form.Group>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton className={styles.accordionBtn}>
                                City
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton className={styles.accordionBtn}>
                                State
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            {states.map(item => (
                                <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label={item.name} value={item.isoCode} onChange={stateFilter} />
                                </Form.Group>
                            ))}
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}


export default Filter