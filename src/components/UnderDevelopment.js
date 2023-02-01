import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const UnderDevelopment = () => {
    return (
        <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} w={'100%'} h={'90vh'} gap={10}>
            <Heading as="h1" size="2xl" color="cyan.600">Under Development</Heading>
            <Text>Sorry for the inconvenience, this page is under development.</Text>
        </Flex>
    )
}

export default UnderDevelopment