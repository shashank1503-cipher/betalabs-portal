import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import AdminCard from './AdminCard'
import { FiPlus,FiPenTool,FiPlayCircle } from 'react-icons/fi'


const AdminContent = () => {
    return (
        <Flex direction={"column"} py={6}>
            <Heading textAlign={"center"} fontSize={"5xl"}>
                Admin Panel
            </Heading>
            <Flex
                justifyContent={"space-evenly"}
                flexWrap={"wrap"}
                align={"center"}
                minH={"55vh"}
            >
                <AdminCard title={"Create Event"} icon={FiPlus} url={"/admin/create"} />
                <AdminCard title={"Edit Event"} icon={FiPenTool} url={"/admin/listevents"} />
                <AdminCard title={"Start Attendance For Event"} icon={FiPlayCircle} url={"/admin/listevents"} />
            </Flex>
        </Flex>

    )
}

export default AdminContent