import React, { useEffect, useState } from "react";
import Job from "./Job";
import JoblyApi from "./api"
import SearchForm from "./SearchForm";

function JobList({applyToJob, hasAppliedToJob}) {

    const [jobs, setJobs] = useState(null)
    const [infoLoaded, setInfoLoaded] = useState(false);


    //fetch initial list of all companies
    useEffect(() => {
        async function fetchAllJobs() {
            const response = await JoblyApi.getJobs();
            setJobs(response);
        }
        fetchAllJobs();
        setInfoLoaded(true);
    }, []);

    async function search(title){
        setInfoLoaded(false);
        let response = await JoblyApi.getJobs(title);
        setJobs(response);
        setInfoLoaded(true);
    }
    
   
    if (!infoLoaded || !jobs) return <h1>Loading</h1>

    return (
        <div>
            <h1>Jobs:</h1>
            <SearchForm searchFor={search} />
            {jobs.length 
            ? (
                <div>
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
            ) : (
                <p>No jobs found.</p>
            )}
        </div>
    )
}

export default JobList;