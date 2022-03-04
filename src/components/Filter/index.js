import React, { useState } from 'react'
import styles from './styles.module.css'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import { Form } from 'react-bootstrap';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import { Country, State, City } from 'country-state-city';
console.log(Country.getAllCountries())
const states = State.getStatesOfCountry('IN')
console.log(states)
const Filter = () => {
let [industry,updateIndustry] = useState([]);
let [sector,updateSector] = useState([]);

const fetchData = () =>{
    console.log('networl')
    console.log(sector)
}

    const sectorFilter = (e) =>{
        console.log(e.target.value)
        if(sector.indexOf(e.target.value)){
            sector = sector.filter(item => item != e.target.value)
            updateSector(sector);
        }
        else{
            
        updateSector(...sector,e.target.value)
        }
        localStorage.setItem("filter",sector);
        fetchData();
    }


   
    return (
        <div className={styles.container1}>
            <div className={styles.section1}>
                <h2 className={styles.filterHeading}>
                    Filter
                </h2>
            </div>
            <div className={styles.section2}>
                <Accordion>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton className={styles.accordionBtn}>
                                Industry
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Advertising" value="advertising" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Agriculture" value="agriculture" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Aeronautics ,Defence" value="defence" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Ai" value="ai" />
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
                                <Form.Check type="checkbox" onChange={sectorFilter} label="Drones" value="" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={sectorFilter} label="Online Classified" value="" />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onChange={sectorFilter} label="Space Technology" value="" />
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
                                    <Form.Check type="checkbox" label={item.name} value={item.isoCode} />
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