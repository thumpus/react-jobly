import React, { useContext, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import UserContext from "./auth/UserContext";

function Job({ id, title, salary, equity, companyHandle, companyName, applyToJob, hasAppliedToJob }) {
    
    const [applied, setApplied] = useState();

    useEffect(function updateAppliedStatus() {
        setApplied(hasAppliedToJob(id));
        console.log(`has applied to ${title}? ${hasAppliedToJob(id)}`);
        }, [id, hasAppliedToJob])

    async function handleApply(evt) {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div>
            <Card id={id} className="my-2"
                color="dark"
                inverse
                style={{
                width: '25rem',
                margin: 'auto'
                }}>
                <CardBody>
                    <CardTitle>
                        <h4>{title}</h4>
                    </CardTitle>
                    <CardText>
                        Salary: {salary}<br/>
                        Equity: {equity}<br/>
                        {companyName ? "Company:" : ""} <Link to={`/companies/${companyHandle}`}> {companyName} </Link><br/>
                    </CardText>
                    <Button  onClick={handleApply} id={id} disabled={applied}>{applied ? "Applied" : "Apply"}</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default Job;