import React from 'react'
import GetAllEventsContent from '../components/GetAllEventsContent'
import SidebarWithHeader from '../components/Sidebar'

const GetAllEvents = () => {
  return (
        <SidebarWithHeader>
            <GetAllEventsContent />
        </SidebarWithHeader>
  )
}

export default GetAllEvents