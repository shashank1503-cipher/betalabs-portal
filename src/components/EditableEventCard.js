import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Image,
    Flex,
    Button,
    IconButton,
    useToast,
    Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaLink, FaUserSecret } from 'react-icons/fa';
import { FiEdit, FiHeart, FiPlay, FiStopCircle } from 'react-icons/fi';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import useAuth from '../context/AuthContext';

export default function EditableEventCard(props) {

    let category = props.category;
    let id = props.id;
    let heroImage = props.heroImage
    let eventName = props.eventName;
    let eventTaker = props.eventTaker;
    let startDate = props.start;
    let endDate = props.end;
    let timing = props.timing;
    const bg = useColorModeValue('white', 'gray.900');
    const color = useColorModeValue('gray.700', 'white');
    let navigate = useNavigate();
    let toast = useToast();
    let { token } = useAuth();
    let [attendance, setAttendance] = useState(props.attendance);
    const [loading, setLoading] = useState(false);
    let startAttendance = async () => {
        setLoading(true);
        let url = `https://betalabs-portal-backend-production.up.railway.app/admin/event/${id}/attendance`
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 'attendanceStatus': true })
            });
            
            if (response.status === 200) {
                setAttendance(true);
                toast({
                    title: 'Attendance Started',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            }
            else {
                let data = await response.json();
                toast({
                    title: 'Attendance Failed',
                    description: 'Error: ' + data.detail,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
        catch (err) {
            console.log("Called")
            console.log(err);
            toast({
                title: 'Attendance Failed',
                description: 'Error: ' + err,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
        finally {
            setLoading(false);
        }
    }
    let stopAttendance = async () => {
        setLoading(true);
        let url = `https://betalabs-portal-backend-production.up.railway.app/admin/event/${id}/attendance`
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 'attendanceStatus': false })
            });
            if (response.status === 200) {
                setAttendance(false);
                toast({
                    title: 'Attendance Stopped',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            }
            else {
                let data = await response.json();
                toast({
                    title: 'Attendance Failed',
                    description: 'Error: ' + data.detail,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
        catch (err) {
            toast({
                title: 'Attendance Failed',
                description: 'Error: ' + err,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Center py={6} px={6}>
            <Box
                maxW={'sm'}
                minW={'xs'}
                bg={bg}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}
            >
                <Box bg={'gray.100'} mt={-6} mx={-6} mb={12} pos={'relative'}>
                    <Image
                        src={heroImage}
                        maxH={'200px'}
                        mx={'auto'}
                        objectFit={'fill'}
                    />
                </Box>
                <Stack>
                    <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}
                    >
                        {category}
                    </Text>
                    <Heading
                        color={color}
                        fontSize={'2xl'}
                        fontFamily={'body'}
                        textAlign={'center'}
                    >
                        {eventName}
                    </Heading>
                    <Flex align={'center'}>
                        <Text color={'gray.400'}>
                            <Text
                                fontWeight={'bold'}
                                color={useColorModeValue('gray.700', 'gray.100')}
                            >
                                Date
                            </Text>
                            {startDate} - {endDate}
                            <Text
                                fontWeight={'bold'}
                                color={useColorModeValue('gray.700', 'gray.100')}
                            >
                                Taken By
                            </Text>
                            {eventTaker}
                            <Text
                                fontWeight={'bold'}
                                color={useColorModeValue('gray.700', 'gray.100')}
                            >
                                Timing
                            </Text>
                            {timing}
                        </Text>
                    </Flex>
                    <Flex justifyContent={'space-around'}>
                        <Tooltip label={'Edit Event'} aria-label={'Edit Event'}>
                            <IconButton
                                onClick={() => navigate(`/admin/event/${id}`)}
                                icon={<FiEdit />}
                                colorScheme={'cyan'}
                            />

                        </Tooltip>
                        <Tooltip label={`${attendance ? 'Stop' : 'Start'} Attendance`} aria-label={`${attendance ? 'Stop' : 'Start'} Attendance`}>
                            <IconButton
                                isLoading={loading}
                                onClick={() => attendance ? stopAttendance() : startAttendance()}
                                icon={attendance ? <FiStopCircle /> : <FiPlay />}
                                colorScheme={'red'}

                            />

                        </Tooltip>

                    </Flex>
                </Stack>
            </Box>
        </Center>
    );
}
