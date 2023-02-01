import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, ButtonGroup, Flex, Heading, Image, Spinner, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import useAuth from '../context/AuthContext'

const EventDetails = ({ eventId }) => {
    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [isAttending, setIsAttending] = useState(false)
    let { token } = useAuth()
    const toast = useToast();

    let getEvent = async () => {
        setIsLoading(true)
        let url = `http://127.0.0.1:8000/events/${eventId}`
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.status === 200) {
                let data = await response.json()
                setEvent(data)
                setButtonDisabled(data.attendance_status === false ? true : false)
                setIsAttending(data.user_attending)
                if (data.attendance_status === true) {
                    setButtonDisabled(data.user_attending)
                }
                setError(null)
            } else {
                let data = await response.json()
                setError(data.detail)
            }
        } catch (err) {
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getEvent()
    }, [])

    let markAttendance = async () => {
        setButtonLoading(true)
        let url = `http://127.0.0.1:8000/events/${eventId}/submitattendance`
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.status === 200) {
                let data = await response.json()
                setIsAttending(true)
                setButtonDisabled(true)
                toast({
                    title: 'Attendance Marked',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                let data = await response.json()
                toast({
                    title: 'Error',
                    description: `${data.error} - ${response.status}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        } catch (err) {
            toast({
                title: 'Error',
                description: `${err}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setButtonLoading(false)
        }
    }

    let linkColor = useColorModeValue('cyan.600', 'cyan');

    return (

        <Flex direction={'column'}>
            {isLoading ? (

                <Flex minH={'100vh'} justifyContent={'center'} align={'center'}>
                    <Spinner />
                </Flex>
            ) : error ? (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : (
                <>
                    <Flex
                        boxShadow={'2xl'}
                        rounded={'md'}
                        borderColor={'gray.200'}
                        direction={['column', 'column', 'column', 'row']}
                    >
                        <Box pos={'relative'} flex={1}>
                            <Image
                                src={
                                    event.image
                                        ? event.image
                                        : 'https://res.cloudinary.com/dpjf6btln/image/upload/v1657569778/Placeholder_j6vr12.png'
                                }
                                maxH={'lg'}
                                roundedTopLeft={'md'}
                                roundedBottomLeft={'md'}
                                mx={'auto'}
                            />
                        </Box>
                        <Flex
                            direction={'column'}
                            flex={1}
                            minH={['sm', 'sm', 'sm', 'sm']}
                            p={5}
                            justifyContent={'space-evenly'}
                        >
                            <Heading
                                textAlign={'center'}
                                fontFamily={`'Source Code Pro',sans-serif`}
                                color={linkColor}
                            >
                                {event.eventName}
                            </Heading>
                            <Text textAlign={'center'} fontSize={'lg'}>
                               By {event.eventTaker}
                            </Text>
                            <ButtonGroup justifyContent={'space-evenly'}>
                                <Button
                                    isLoading={buttonLoading}
                                    colorScheme={'cyan'}
                                    variant={'solid'}
                                    onClick={() => {
                                        markAttendance()
                                    }}
                                    isDisabled={buttonDisabled}
                                >
                                    {isAttending ? 'Attendance Marked' : 'Mark Attendance'}
                                </Button>
                            </ButtonGroup>
                        </Flex>
                    </Flex>
                    <Flex
                        mt={10}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        borderColor={'gray.200'}
                        direction={['column', 'column', 'column', 'row']}
                    >
                        <Flex
                            pos={'relative'}
                            flex={1}
                            direction={'column'}
                            p={5}
                            textAlign={['center', 'center', 'center', 'left']}
                            justifyContent={'flex-start'}
                        >
                            <Heading fontFamily={`'Source Code Pro',sans-serif`} m={10}>
                                About Event
                            </Heading>
                            <Text ml={[0, 0, 0, 10]}>{event.description}</Text>
                            <Heading fontFamily={`'Source Code Pro',sans-serif`} m={10}>
                                Event Dates
                            </Heading>
                            <Text ml={[0, 0, 0, 10]}>{event.start} - {event.end}</Text>
                            <Heading fontFamily={`'Source Code Pro',sans-serif`} m={10}>
                                Timings
                            </Heading>
                            <Text ml={[0, 0, 0, 10]}>{event.timing}</Text>
                            {event.rules && (<>
                                <Heading fontFamily={`'Source Code Pro',sans-serif`} m={10}>
                                    Rules
                                </Heading>
                                <Text ml={[0, 0, 0, 10]}>{event.rules}</Text>
                            </>)}
                            {event.prizes && (<>
                                <Heading fontFamily={`'Source Code Pro',sans-serif`} m={10}>
                                    Prizes
                                </Heading>
                                <Text ml={[0, 0, 0, 10]}>{event.prizes}</Text>
                            </>)}

                        </Flex>
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default EventDetails