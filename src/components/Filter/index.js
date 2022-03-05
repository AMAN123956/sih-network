import React, { useState } from 'react'
import styles from './styles.module.css'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import { Form,Button } from 'react-bootstrap';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import { Country, State, City } from 'country-state-city';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
console.log(Country.getAllCountries())
const states = State.getStatesOfCountry('IN')
const cities = City.getCitiesOfCountry('IN')

const Filter = () => {
    let [industry, updateIndustry] = useState([]);
    let [sector, updateSector] = useState([]);
    let [state, updateState] = useState([])
    let sectorFilterTodos = [];
    let industryFilterTodos = [];
    let stateFilterTodos = [];
    const fetchData = () => {
        console.log('network')
        console.log(JSON.stringify(sector))
    }

    const industryFilter = (e) => {
        console.log(e.target.value)

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
        console.log(e.target.value)
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
        console.log(e.target.value)
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


    return (
        <div className={`${styles.container1} shadow`}>
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