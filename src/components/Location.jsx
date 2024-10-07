import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Location({ location }) {
    const [originLocation, setOriginLocation] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchLocation = async () => {
            try {

                if (location.url) {
                    const response = await fetch(location.url);
                    const data = await response.json();
                    setOriginLocation(data);
                    setShow(true);
                }
            } catch (error) {
                console.log('Error fetching origin', error);
            }
        };

        if (location) {
            fetchLocation();
        }
    }, [location]);

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal  show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Location</Modal.Title>
                </Modal.Header>

                <Modal.Body >
                    {originLocation ? (
                        <ul>
                            <li>
                                <strong>Name: </strong>{originLocation.name}
                            </li>
                            <li>
                                <strong>URL: </strong>
                                <a href={originLocation.url} target="_blank" rel="noopener noreferrer">
                                    {originLocation.url}
                                </a>
                            </li>
                        </ul>
                    ) : (
                        <p>Loading location data...</p>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Location;