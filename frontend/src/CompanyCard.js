import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";


function CompanyCard(props) {
    return (
        <div>
            <Link to={`/companies/${props.handle}`}>
                <Card className="my-2"
                color="dark"
                inverse
                style={{
                width: '40rem',
                margin: 'auto'
                }}>
                    <CardBody>
                        <CardTitle>
                            <h3>{props.name}</h3>
                        </CardTitle>
                        <CardText>
                            <p>{props.description}</p>
                        </CardText>
                    </CardBody>
                </Card>
            </Link>

        </div>
    )
}

export default CompanyCard;