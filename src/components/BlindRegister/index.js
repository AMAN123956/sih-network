import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { url } from "../../utilities";

const BlindRegister = () => {
    const [step, updateStep] = useState(0);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [number, setnumber] = useState(null)
    const [industry, setindustry] = useState(null)
    const [sector, setsector] = useState(null)
    const [password, setpassword] = useState("");
    const [startupId, setstartupId] = useState(null)
    const [userType, setUserType] = useState(null);
    const [startupDesc, setstartupDesc] = useState(null)
    const [startupAddress, setstartupAddress] = useState(null)

    const [user, setuser] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory();
 
    const localData = localStorage.getItem("driveUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;

    const nextStep = () => {
        updateStep(step + 1);
    }
    const prevStep = () => {
        updateStep(step - 1);
    }
    const updateName = (e) => {
        console.log(e.target.value)
        setname(e.target.value)
    }
    const updateEmail = (e) => {
        setemail(e.target.value)
    }

    const submitHandler = async (e) => {
        try {
            if (name===null) {
                handleShow();
            }
            else if(!email){
                handleShow()
            }
            else{
            setLoading(true);
            const { data } = await axios.post(`${url}/api/users`, {
                name: name,
                email,
                password,
            });

            setLoading(false);
            if (data && data.success) {
                localStorage.setItem(
                    "driveUserInfo",
                    JSON.stringify(data.data)
                );
                setSuccess(true);
                setuser(data.data);
            } else {
                if (data) {
                    seterror(data.message);
                } else {
                    seterror("Network error");
                }
            }
        }
        } catch (e) {
            setLoading(false);
            seterror("Network Error");
        }

    }

    document.addEventListener('keydown', (e) => {

        console.log(e.key)
        console.log(e.keyCode)
        // Assign keys for step1 selection
        if (step === 0) {
            console.log('step 0')
            if (e.key === 'e' || e.key === 'E') {
                setUserType('entrepreneur')
            }
            else if (e.key === 's' || e.key === 'S') {
                setUserType('startup')
            }
            else if (e.key === 'i' || e.key === 'I') {
                setUserType('investor')
            }
            else if (e.key === 'Shift') {
                nextStep();
            }

            // else if (e.key==='Control') {
            //     prevStep();
            // }

        }
        else if (step === 1) {
            // j for next
            console.log('step1')
            if (e.key === 'Shift') {
                nextStep()
                // setname((name) => {
                //     console.log('name')
                //     console.log(name)
                //     if (name !== '' && name !== undefined) {
                //         console.log('run')
                //         setname(name)
                //         nextStep();
                //     }
                //     else {
                //         alert('Fill Username Before moving further')
                //     }
                // })
            }

            // f for next step
            else if (e.key === 'Control') {
                prevStep()
            }

        }

        else if (step === 2) {
            console.log('step2')
            // audio play for invalid key press
            // press 1 to listen audio again
            if (e.key === 'Shift') {
                // setemail((email) => {
                //     console.log(email)
                //     if (email !== '' && email !== undefined) {
                //         setemail(email)
                //         nextStep();
                //     }
                //     else {
                //         alert('Fill Email Before Moving Further')
                //     }
                // })
                nextStep()

            }

            else if (e.key === 'Control') {
                prevStep()
            }
            else {
                console.log('bye')
            }
        }

        else if (step === 3) {
            console.log('step3')
            if (e.key === 'Shift') {
                nextStep();
            }
            else if (e.key === 'Control') {
                prevStep()
            }
        }
        else if (step === 4) {
            if (e.key === 'Shift') {
                nextStep()
            }
            else if (e.key === 'Control') {
                prevStep()
            }
        }
        else if (step === 5) {
            if (e.key === 'Shift') {
                nextStep()
            }
            else if (e.key === 'Control') {
                prevStep()
            }
        }
        else if (step === 6) {
            if (e.key === 'Shift') {
                nextStep()
            }
            else if (e.key === 'Control') {
                prevStep()
            }
        }
        else if (step === 7) {
            if (e.key === 'Shift') {
                nextStep()
            }
            else if (e.key === 'Control') {
                prevStep()
            }
        }
        else if (step === 8) {
            if (e.key === 'Shift') {
                nextStep()
            }
            else if (e.key === 'Control') {
                prevStep()
            }
        }
    })

    return (
        <div className={styles.container1}>
            <div className={styles.formSection}>
                {step === 0 ?
                    <div className="d-flex" id="one">
                        <div className={styles.leftSection}>
                            <Form.Group controlId="formBasicUserType">
                                <Form.Label className={styles.formLabel}>Select User Type &nbsp;</Form.Label>
                                <br />
                                <div className={styles.optionBox}>
                                    <button className={`shadow ${styles.options}`}>
                                        Entrepreneur
                                    </button>
                                    <button className={`shadow ${styles.options}`}>
                                        Investor
                                    </button>
                                    <button className={`shadow ${styles.options}`}>
                                        Company
                                    </button>
                                </div>
                            </Form.Group>
                        </div>
                        <div className={styles.rightSection}>
                            <p>Press. E for Entrepreneur</p>
                            <p>Press. S for StartUp</p>
                            <p>Press. I for Investor</p>
                            <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                    : null}
                {step === 1 ?
                    <div className="d-flex">
                        <div className={styles.leftSection}>
                            <Form.Group controlId="formBasicUserName">
                                <Form.Label className={styles.formLabel}>Username</Form.Label>
                                <Form.Control className={styles.inputField}
                                    type="text"
                                    autoFocus
                                    placeholder="Enter Username"
                                    required
                                    value={name}
                                    onChange={updateName}
                                />

                            </Form.Group>
                        </div>
                        <div className={styles.rightSection}>
                            <p>Press. E for Entrepreneur</p>
                            <p>Press. S for StartUp</p>
                            <p>Press. I for Investor</p>
                            <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                            &nbsp;&nbsp;
                            <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                    : null}
                {step === 2 ?
                    <div className="d-flex">
                        <div className={styles.leftSection}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className={styles.formLabel}>Email address</Form.Label>
                                <Form.Control
                                    className={styles.inputField}
                                    type="email"
                                    autoFocus
                                    placeholder="Enter email"
                                    required
                                    value={email}
                                    onChange={updateEmail}
                                />
                            </Form.Group>
                        </div>
                        <div className={styles.rightSection}>
                            <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                            &nbsp;&nbsp;
                            <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                    : null}
                {step === 3 ? <div className="d-flex">
                    <div className={styles.leftSection}>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className={styles.formLabel}>Password</Form.Label>
                            <Form.Control
                                className={styles.inputField}
                                type="password"
                                autoFocus
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setpassword(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </div>
                    <div className={styles.rightSection}>
                        <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                        &nbsp;&nbsp;
                        <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                    </div>
                </div> : null}
                {step === 4 ? <div className="d-flex">
                    <div className={styles.leftSection}>
                        <Form.Group controlId="formBasicNumber">
                            <Form.Label className={styles.formLabel}>Number</Form.Label>
                            <Form.Control
                                className={styles.inputField}
                                type="text"
                                autoFocus
                                placeholder="Enter Mobile Number"
                                required
                                value={number}
                                onChange={(e) => {
                                    setnumber(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </div>
                    <div className={styles.rightSection}>
                        <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                        &nbsp;&nbsp;
                        <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                    </div>
                </div> : null}
                {step === 5 ? <div className="d-flex">
                    <div className={styles.leftSection}>
                        <Form.Group controlId="formBasicText">
                            <Form.Label className={styles.formLabel}>Enter Industry</Form.Label>
                            <Form.Control
                                className={styles.inputField}
                                type="text"
                                placeholder="Enter Industry"
                                required
                                autoFocus
                                value={industry}
                                onChange={(e) => {
                                    setindustry(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </div>
                    <div className={styles.rightSection}>
                        <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                        &nbsp;&nbsp;
                        <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                    </div>
                </div> : null}
                {step === 6 ? <div className="d-flex">
                    <div className={styles.leftSection}>
                        <Form.Group controlId="formBasicText">
                            <Form.Label className={styles.formLabel}>Enter Sector</Form.Label>
                            <Form.Control
                                className={styles.inputField}
                                type="text"
                                placeholder="Enter Sector"
                                required
                                autoFocus
                                value={sector}
                                onChange={(e) => {
                                    setsector(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </div>
                    <div className={styles.rightSection}>
                        <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                        &nbsp;&nbsp;
                        <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                    </div>
                </div> : null}
                {userType}
                {(userType === 'startup' && step === 7) ? <div className="d-flex">
                    <div className={styles.leftSection}>
                        <Form.Group controlId="formBasicText">
                            <Form.Label className={styles.formLabel}>Enter StartUp Id </Form.Label>
                            <Form.Control
                                className={styles.inputField}
                                type="text"
                                placeholder="Startup Id"
                                required
                                autoFocus
                                value={startupId}
                                onChange={(e) => {
                                    setstartupId(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </div>
                    <div className={styles.rightSection}>
                        <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                        &nbsp;&nbsp;
                        <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                    </div>
                </div> : null}
                {step === 8 && userType === 'startup' ? <div className="d-flex">
                    <div className={styles.leftSection}>
                        <Form.Group controlId="formBasicText">
                            <Form.Label className={styles.formLabel}>Startup Description </Form.Label>
                            <Form.Control
                                className={styles.inputField}
                                type="text"
                                placeholder="Startup Description..."
                                required
                                autoFocus
                                value={startupDesc}
                                onChange={(e) => {
                                    setstartupDesc(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </div>
                    <div className={styles.rightSection}>
                        <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                        &nbsp;&nbsp;
                        <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                    </div>
                </div> : null}
                {step === 9 && userType === 'startup' ? <div className="d-flex">
                    <div className={styles.leftSection}>
                        <Form.Group controlId="formBasicText">
                            <Form.Label className={styles.formLabel}>Startup Address </Form.Label>
                            <Form.Control
                                className={styles.inputField}
                                type="text"
                                placeholder="Delhi..."
                                required
                                autoFocus
                                autoCapitalize="uppercase"
                                value={startupAddress}
                                onChange={(e) => {
                                    setstartupAddress(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </div>
                    <div className={styles.rightSection}>
                        <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                        &nbsp;&nbsp;
                        <button className="next btn btn-primary" onClick={submitHandler}>Register</button>
                    </div>
                </div> : null}



            </div>
        </div>
    )
}


export default BlindRegister