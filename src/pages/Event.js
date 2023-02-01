import React from 'react'
import { useParams } from 'react-router'
import EventDetails from '../components/EventDetails'
import SidebarWithHeader from '../components/Sidebar'

const Event = () => {
    let { id } = useParams()
    return (
        <SidebarWithHeader>
            <EventDetails eventId={id} />
        </SidebarWithHeader>
    )
}

export default Event