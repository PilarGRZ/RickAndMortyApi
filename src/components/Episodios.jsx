import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react"

function Episodios({ episode }) {

    const [episodesData, setEpisodesData] = useState([])
    const [show, setShow] = useState(false)


    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const responses = episode.map((url) => fetch(url).then((res) => res.json()))
                const data = await Promise.all(responses);
                setEpisodesData(data)
                setShow(true)

            }

            catch (error) {
                console.log('Error Episodes', error)
            }
        };

        if (episode.length > 0) {
            fetchEpisodes();

        }
    }, [episode])


    const handleClose = () => setShow(false)

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Episodes List</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ul>
                        {episodesData.map((episodesInfo) => (
                            <li key={episodesInfo.id}>
                                <a href={episodesInfo.url} target="_blank" rel="noopener noreferrer">
                                    {episodesInfo.url}
                                </a>

                            </li>


                        ))}
                    </ul>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>


            </Modal>
        </>
    )
}

export default Episodios

