import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api"
import SearchForm from "./SearchForm";
import { CardGroup } from "reactstrap";


function CompanyList() {

    const [companies, setCompanies] = useState(null)
    const [infoLoaded, setInfoLoaded] = useState(false);


    //fetch initial list of all companies
    useEffect(() => {
        async function fetchAllCompanies() {
            const response = await JoblyApi.getCompanies();
            setCompanies(response);
        }
        fetchAllCompanies();
        setInfoLoaded(true);
    }, []);
    
    async function search(name) {
        setInfoLoaded(false);
        let response = await JoblyApi.getCompanies(name);
        setCompanies(response);
        setInfoLoaded(true)
    }

    
    if (!infoLoaded || !companies) return <h1>Loading</h1>

    return (
        <div>
            <h1>Companies:</h1>
            <SearchForm searchFor={search} />
            {companies.length
            ? (
                <div>
                  {companies.map(c => (
                      <CompanyCard
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                      />
                  ))}
                </div>
            ) : (
                <p>No companies found.</p>
            )}
        </div>
    )
}

export default CompanyList;