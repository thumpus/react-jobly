import React, { useState } from "react";
import { Button } from "reactstrap";

function SearchForm({ searchFor }) {

    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(evt) {
        evt.preventDefault();
        searchFor(searchTerm);
    }

    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    name="searchTerm"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <Button type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default SearchForm;