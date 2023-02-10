import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Icon,
    Text,
    Stack,
    HStack,
    VStack,
} from '@chakra-ui/react';
import { AiOutlineStock } from 'react-icons/ai';

// Replace test data with your own
const features = [{
    id: 1,
    title: 'Participation in TCA events',
    text: 'Every time you participate in a TCA event, you get 10 points. The more events you participate in, the more points you get. Your participation is verified by the attendance system.',
},
{
    id: 2,
    title: 'Participation in Assessments',
    text: 'Every time you participate in an assessment, you get 10 points.Submitting a project would get you 100 points. Further points would be allotted according to the rules. The more assessments you participate in, the more points you get.',
},
{
    id: 3,
    title: 'Collaborating in Tech Club Projects',
    text: 'Each Pull Request to a Tech Club project, would get you points.Points are allocated according to the level of issue or the hours put to the PR. The more projects you collaborate in, the more points you get.',
},
]

export default function LeaderboardPoints() {
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>How your scores are calculated</Heading>
                <Text color={'gray.600'} fontSize={'xl'}>
                    The above scores are calculated are subject to change. The scores are calculated based on the following factors
                </Text>
            </Stack>

            <Container maxW={'8xl'} mt={10}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                    {features.map((feature) => (
                        <HStack key={feature.id} align={'top'}>
                            <Box color={'green.400'} px={2}>
                                <Icon as={AiOutlineStock} />
                            </Box>
                            <VStack align={'start'}>
                                <Text fontWeight={600}>{feature.title}</Text>
                                <Text color={'gray.600'}>{feature.text}</Text>
                            </VStack>
                        </HStack>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
