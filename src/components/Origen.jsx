import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Origen({ origin }) {
  const [originData, setOriginData] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchOrigin = async () => {
      try {

        if (origin.url) {
          const response = await fetch(origin.url);
          const data = await response.json();
          setOriginData(data);
          setShow(true);
        }
      } catch (error) {
        console.log('Error fetching origin', error);
      }
    };

    if (origin) {
      fetchOrigin();
    }
  }, [origin]);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Origin</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {originData ? (
            <ul>
              <li>
                <strong>Name: </strong>{originData.name}
              </li>

              <li>
                <strong>URL: </strong>
                <a href={originData.url} target="_blank" rel="noopener noreferrer">
                  {originData.url}
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

export default Origen;
