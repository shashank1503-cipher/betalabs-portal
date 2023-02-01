import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Heading, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useAuth from '../context/AuthContext'
import EditableEventCard from './EditableEventCard'
import EventCard from './EventCard'

const GetAllEventsContent = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState(0)
    let upcoming = 'all'
    let { token } = useAuth()
    const fetchEvents = async () => {
        setLoading(true)
        try {
            let url = `http://127.0.0.1:8000/events?page=${page}&per_page=${perPage}&upcoming=${upcoming}`
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.status === 200) {
                const data = await res.json()
                console.log(data)
                setEvents(data.data)
                setTotal(data.meta.total)
                setError(null)
            } else {
                const data = await res.json();
                let errorMessage = new Error(data.detail);
                setError(errorMessage);
            }
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchEvents()
    }, [page, perPage])
    return (
        <Flex direction={'column'}>
            <Heading as="h1" size="2xl" m={10}>
                All Events
            </Heading>
            <Flex gap={2} wrap={'wrap'} justifyContent={'center'} alignItems={'center'} w={'100%'} m={10}>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <Alert status="error" w={'full'}>
                        <AlertIcon />
                        <AlertTitle>Error! </AlertTitle>
                        <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                ) : total === 0 ? (
                    <Alert status="info" w={'fit-content'}>
                        <AlertIcon />
                        <AlertTitle>No {upcoming === "future" ? "Upcoming" : "Past"} Events</AlertTitle>
                    </Alert>
                ) : (
                    events.map((event) => (
                        <EditableEventCard
                            key={event["_id"]}
                            id={event["_id"]}
                            category={event.eventCategory}
                            heroImage={event.image}
                            eventName={event.eventName}
                            eventTaker={event.eventTaker}
                            timing={event.timing}
                            start={event.start}
                            end={event.end}
                            attendance={event.attendance_status}
                        />
                    ))
                )}
            </Flex>
        </Flex>
    )
}

export default GetAllEventsContent