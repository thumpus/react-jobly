import React, { useEffect, useState } from "react";
import Job from "./Job";
import { useParams } from "react-router-dom";
import JoblyApi from "./api"

function Company({ applyToJob, hasAppliedToJob }) {

    const { handle } = useParams();
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState(null);


    useEffect(function loadCompany() {
        async function fetchCompany(handle) {
            let res = await JoblyApi.getCompany(handle)
            setCompany(res);
            setJobs(res.jobs);
        }
        fetchCompany(handle);
    }, []);
    
    if (!company) return <h1>Loading</h1>

    return (
        <div>
            <h1>{company.name}</h1>
            <span>{company.description}</span>
            {jobs.map(j => (
                <Job 
                key={j.id}
                id={j.id}
                title={j.title}
                salary={j.salary}
                equity={j.equity}
                companyName={j.companyName}
                companyHandle={j.companyHandle}
                applyToJob={applyToJob}
                hasAppliedToJob={hasAppliedToJob}
                />
            ))}
           
        </div>
    )
}

export default Company;