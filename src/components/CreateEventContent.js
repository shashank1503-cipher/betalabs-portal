import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    Heading,
    Image,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
    Textarea,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import useAuth from '../context/AuthContext';

const CreateEventContent = () => {
    let color = useColorModeValue('gray.900', 'gray.50');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [imageError, setImageError] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventTaker, setEventTaker] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventStart, setEventStart] = useState('');
    const [eventEnd, setEventEnd] = useState('');
    const [eventTiming, setEventTiming] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventRules, setEventRules] = useState('');
    const [eventPrizes, setEventPrizes] = useState('');
    const [eventType, setEventType] = useState('');

    const [loading, setLoading] = useState(false);

    const toast = useToast();

    let { token } = useAuth();
    let uploadImage = async () => {
        setUploading(true);
        if (image) {
            setUploading(true);
            let formData = new FormData();
            formData.append('file', image);
            try {
                formData.append('upload_preset', 'partnersInCrime');
                formData.append('cloud_name', 'dpjf6btln');
                const res = await fetch(
                    'https://api.cloudinary.com/v1_1/dpjf6btln/image/upload',
                    {
                        method: 'POST',
                        body: formData,
                    }
                );
                if (res.status === 200) {
                    const data = await res.json();
                    setImageUrl(data.url);
                    setImageError('');
                    toast({
                        title: 'Image Uploaded Successfully',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    const data = await res.json();
                    setImageError(data.error);
                    toast({
                        title: 'Error',
                        description: `${data.error} - ${res.status}`,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                setImageError(error.message);
                toast({
                    title: 'Error',
                    description: `Something went wrong - ${error.message}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            } finally {
                setUploading(false);
                setImage(null);
            }
        } else {
            setImageError('Please select an image');
            setUploading(false);
        }
    };
    let sendData = async () => {
        setLoading(true);
        let data = {
            "eventName": eventName,
            "eventTaker": eventTaker,
            "eventCategory": eventCategory,
            "eventType": eventType,
            "eventStart": eventStart,
            "eventEnd": eventEnd,
            "eventDescription": eventDescription,
            "eventRules": eventRules,
            "eventPrizes": eventPrizes,
            "winners": [],
            "eventImage": imageUrl,
            "eventTiming": eventTiming,
            "attendance_status": false

        };
        try {
            const res = await fetch(
                'http://127.0.0.1:8000/admin/event',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (res.status === 200) {
                toast({
                    title: 'Event Added Successfully',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                setEventName('');
                setEventTaker('');
                setEventCategory('');
                setEventType('');
                setEventStart('');
                setEventEnd('');
                setEventTiming('');
                setEventDescription('');
                setEventRules('');
                setEventPrizes('');
                setImageUrl('');
                setImage(null);
                localStorage.removeItem('eventName');
                localStorage.removeItem('eventTaker');
                localStorage.removeItem('eventCategory');
                localStorage.removeItem('eventType');
                localStorage.removeItem('eventStart');
                localStorage.removeItem('eventEnd');
                localStorage.removeItem('eventTiming');
                localStorage.removeItem('eventDescription');
                localStorage.removeItem('eventRules');
                localStorage.removeItem('eventPrizes');
                localStorage.removeItem('image');
                localStorage.removeItem('imageUrl');
            } else {
                const data = await res.json();
                toast({
                    title: data.detail,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };
    let saveDraft = () => {
        try {
            localStorage.setItem('eventName', eventName);
            localStorage.setItem('eventTaker', eventTaker);
            localStorage.setItem('eventCategory', eventCategory);
            localStorage.setItem('eventType', eventType);
            localStorage.setItem('eventStart', eventStart);
            localStorage.setItem('eventEnd', eventEnd);
            localStorage.setItem('eventTiming', eventTiming);
            localStorage.setItem('eventDescription', eventDescription);
            localStorage.setItem('eventRules', eventRules);
            localStorage.setItem('eventPrizes', eventPrizes);
            localStorage.setItem('imageUrl', imageUrl);
            toast({
                title: 'Draft Saved',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };
    let loadDraft = () => {
        setEventName(localStorage.getItem('eventName'));
        setEventTaker(localStorage.getItem('eventTaker'));
        setEventCategory(localStorage.getItem('eventCategory'));
        setEventType(localStorage.getItem('eventType'));
        setEventStart(localStorage.getItem('eventStart'));
        setEventEnd(localStorage.getItem('eventEnd'));
        setEventTiming(localStorage.getItem('eventTiming'));
        setEventDescription(localStorage.getItem('eventDescription'));
        setEventRules(localStorage.getItem('eventRules'));
        setEventPrizes(localStorage.getItem('eventPrizes'));
        setImageUrl(localStorage.getItem('imageUrl'));
        
    };
    useEffect(() => {
        uploadImage();
    }, [image]);
    useEffect(() => {
        loadDraft();
    }, []);

    return (
        <Flex justifyContent={'center'} direction={'column'} align={'center'}>
            <Heading fontFamily={`'Source Code Pro',sans-serif`}>
                The next big event of Technical Club
            </Heading>
            <Text color={color} fontSize={'lg'} mt={5}>
                {' '}
                Let's make it Real 😎
            </Text>
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={'column'}
                w={['sm', 'md', 'lg', 'xl']}
            >
                <Button
                    colorScheme={'teal'}
                    leftIcon={<FaImage />}
                    isLoading={uploading}
                >
                    Add Image
                    <Input
                        type="file"
                        height="100%"
                        width="100%"
                        position="absolute"
                        top="0"
                        left="0"
                        opacity="0"
                        aria-hidden="true"
                        accept="image/*"
                        cursor={'pointer'}
                        disabled={uploading}
                        onChange={e => {
                            setImage(e.target.files[0]);
                        }}
                    />
                </Button>

                {imageUrl && (
                    <>
                        <Text
                            fontFamily={`'Source Code Pro',sans-serif`}
                            textAlign={'center'}
                            mt={4}
                        >
                            Preview
                        </Text>
                        <Image src={imageUrl} alt="project" />
                    </>
                )}
            </Flex>
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={'column'}
                w={['sm', 'md', 'lg', 'xl']}
            >
                <Text
                    fontFamily={`'Source Code Pro',sans-serif`}
                    textAlign={'center'}
                    mb={4}
                >
                    Well what's in the name, but still
                </Text>
                <FormControl>
                    <Input
                        placeholder="Your Event Name"
                        size={['sm', 'md', 'lg', 'lg']}
                        value={eventName}
                        onChange={e => setEventName(e.target.value)}
                    />
                </FormControl>
            </Flex>
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={'column'}
                w={['sm', 'md', 'lg', 'xl']}
            >
                <Text
                    fontFamily={`'Source Code Pro',sans-serif`}
                    textAlign={'center'}
                    mb={4}
                >
                    Taken By
                </Text>
                <FormControl>
                    <Input
                        placeholder="The one who takes this event"
                        size={['sm', 'md', 'lg', 'lg']}
                        value={eventTaker}
                        onChange={e => setEventTaker(e.target.value)}
                    />
                </FormControl>
            </Flex>
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={'column'}
                align={'center'}
                w={['sm', 'md', 'lg', 'xl']}
                justifyContent={'center'}
            >
                <Text
                    fontFamily={`'Source Code Pro',sans-serif`}
                    textAlign={'center'}
                    mb={4}
                >
                    Event description
                </Text>
                <FormControl>
                    <Textarea
                        placeholder="Describe your event in short"
                        value={eventDescription}
                        onChange={e => setEventDescription(e.target.value)}
                    />
                </FormControl>
            </Flex>
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={'column'}
                w={['sm', 'md', 'lg', 'xl']}
            >
                <Text
                    fontFamily={`'Source Code Pro',sans-serif`}
                    textAlign={'center'}
                    mb={4}
                >
                    Category of Event
                </Text>
                <FormControl>
                    <Input
                        placeholder="Category of Event"
                        size={['sm', 'md', 'lg', 'lg']}
                        value={eventCategory}
                        onChange={e => setEventCategory(e.target.value)}
                    />
                </FormControl>
            </Flex>
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={'column'}
                w={['sm', 'md', 'lg', 'xl']}
            >
                <Text
                    fontFamily={`'Source Code Pro',sans-serif`}
                    textAlign={'center'}
                    mb={4}
                >
                    Event Type
                </Text>
                <FormControl>
                    <RadioGroup onChange={setEventType} value={eventType}>
                        <Stack direction='row'>
                            <Radio value='Session'>Session</Radio>
                            <Radio value='Assessment'>Assessment</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
            </Flex>

            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={'column'}
                align={'center'}
                w={['sm', 'md', 'lg', 'xl']}
                justifyContent={'center'}
            >
                <Text

                    fontFamily={`'Source Code Pro',sans-serif`}
                    textAlign={'center'}
                    mb={4}
                >
                    Event Rules
                </Text>
                <FormControl>
                    <Textarea
                        placeholder="Event Rules"
                        value={eventRules}
                        onChange={e => setEventRules(e.target.value)}
                    />
                </FormControl>
            </Flex>
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={'column'}
                align={'center'}
                w={['sm', 'md', 'lg', 'xl']}
                justifyContent={'center'}
            >
                <Text
                    fontFamily={`'Source Code Pro',sans-serif`}
                    textAlign={'center'}
                    mb={4}
                >
                    Event Prizes
                </Text>
                <FormControl>
                    <Textarea
                        placeholder="Event Prizes"
                        value={eventPrizes}
                        onChange={e => setEventPrizes(e.target.value)}
                    />
                </FormControl>
            </Flex>
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={'column'}
                align={'center'}
                w={['sm', 'md', 'lg', 'xl']}
                justifyContent={'center'}
            >
                <Text
                    fontFamily={`'Source Code Pro',sans-serif`}
                    textAlign={'center'}
                    mb={4}
                >
                    Event Start Date
                </Text>
                <FormControl>
                    <Input
                        placeholder="DD/MM/YYYY"
                        size={['sm', 'md', 'lg', 'lg']}
                        value={eventStart}
                        onChange={e => setEventStart(e.target.value)}
                    />
                </FormControl>
            </Flex>
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={'column'}
                align={'center'}
                w={['sm', 'md', 'lg', 'xl']}
                justifyContent={'center'}
            >
                <Text
                    fontFamily={`'Source Code Pro',sans-serif`}
                    textAlign={'center'}
                    mb={4}
                >
                    Event End Date
                </Text>
                <FormControl>
                    <Input
                        placeholder="DD/MM/YYYY"
                        size={['sm', 'md', 'lg', 'lg']}
                        value={eventEnd}
                        onChange={e => setEventEnd(e.target.value)}
                    />
                </FormControl>
            </Flex>
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={'column'}
                align={'center'}
                w={['sm', 'md', 'lg', 'xl']}
                justifyContent={'center'}
            >
                <Text
                    fontFamily={`'Source Code Pro',sans-serif`}
                    textAlign={'center'}
                    mb={4}
                >
                    Event Timing
                </Text>
                <FormControl>
                    <Input
                        placeholder="Event Timing"
                        size={['sm', 'md', 'lg', 'lg']}
                        value={eventTiming}
                        onChange={e => setEventTiming(e.target.value)}
                    />
                </FormControl>
            </Flex>
            <Flex m={10}>
                <ButtonGroup spacing={10}>
                    <Button
                        variant={'solid'}
                        colorScheme={'teal'}
                        onClick={sendData}
                        isLoading={loading}
                    >
                        Post Idea
                    </Button>
                    <Button variant={'solid'} disabled={loading} onClick={saveDraft}>
                        Save Draft
                    </Button>
                </ButtonGroup>
            </Flex>
        </Flex>
    );
};

export default CreateEventContent;
