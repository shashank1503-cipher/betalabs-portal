import { Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useAuth from '../context/AuthContext'
import EventCard from './EventCard'
import Events from './Events'
import UpcomingEvents from './Events'

const MainContent = () => {
  const [techSprint, setTechSprint] = useState('')
  let { token } = useAuth()
  let fetchTechSprint = async () => {
    let url = "http://127.0.0.1:8000/techsprint"
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    let data = await res.json()
    console.log(data)
    setTechSprint(data.techsprint)
  }

  useEffect(() => {
    fetchTechSprint()
  }, [])

  return (
    <Flex direction={'column'}>
      {/* <Flex direction={'column'} gap={2} >
        <Heading textAlign={'center'}>
          This Month's Tech Sprint
        </Heading>
        <Heading fontFamily={`'Poppins',sans-serif`} textAlign={'center'} color={'cyan.500'} >
          {techSprint ? techSprint : "Loading..."}
        </Heading>
      </Flex> */}
      <Heading textAlign={'center'} marginY={10} >
        Upcoming Events
      </Heading>
      <Events upcoming={'future'} />
      <Heading textAlign={'center'} marginY={10}>
        Past Events
      </Heading>
      <Events upcoming={'past'}/>
    </Flex>
  )
}

export default MainContent