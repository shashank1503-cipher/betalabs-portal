import { Alert, AlertDescription, AlertIcon, AlertTitle, Avatar, ButtonGroup, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, IconButton, Input, InputGroup, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiRefreshCcw, FiRefreshCw, FiSearch, FiX } from 'react-icons/fi'
import useAuth from '../context/AuthContext'
import LeaderboardPoints from './LeaderboardPoints'

const LeaderboardContent = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [queryError, setQueryError] = useState(false)

  let { token } = useAuth()
  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const res = await fetch(
        `https://betalabs-portal-backend-production.up.railway.app/leaderboard/all?q=${search}&page=${page}&per_page=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      setData(data.data)
      console.log(data)
      setTotalPages(Math.ceil(data.meta.total / 10))

    } catch (error) {
      setError(error.message)

    }
    finally {
      setLoading(false)
    }
  }



  useEffect(() => {
    fetchLeaderboard()
  }, [page, search])

  return (
    <Flex m={10} direction={'column'} gap={10}>
      <Flex justifyContent={'center'}>
        <Heading>Overall Leaderboard</Heading>
      </Flex>
      <Flex justifyContent={['center','center','space-between','space-between']} align={['center','center','normal','normal']} direction={['column', 'column', 'row', 'row']} gap={5} >
        <HStack gap={10}>
          <ButtonGroup size={'sm'} isAttached variant='outline'>
            <IconButton aria-label='Previous' icon={<FiChevronLeft />} onClick={() => { setPage(page - 1) }} isDisabled={page === 1 ? true : false} />
            <IconButton aria-label='Next' icon={<FiChevronRight />} onClick={() => { setPage(page + 1) }} isDisabled={page === totalPages ? true : false} />
          </ButtonGroup>
          <Text>Page {page} of {totalPages}</Text>
        </HStack>
        <InputGroup w={'fit-content'} gap={2}>
          <FormControl isInvalid={queryError}>

            <Input type='text' placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value) }} />
            {!queryError ? (
              <FormHelperText>Search by name</FormHelperText>
            ) : (
              <FormErrorMessage>Query should be At least greater than 3 characters</FormErrorMessage>
            )}
          </FormControl>
          {search.length > 0 &&
            <Tooltip label='Clear' aria-label='Clear' >
              <IconButton aria-label='Clear' icon={<FiX />} onClick={() => { setSearch(''); }} />
            </Tooltip>}
        </InputGroup>
      </Flex>
      {loading ? <Flex justifyContent={'center'} align={'center'} alignItems={'center'} h={'50vh'}> <Spinner size={'xl'} /> </Flex> : error ? <Alert status="error" w={'full'}>
        <AlertIcon />
        <AlertTitle>Error! </AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert> : (<>

        <TableContainer my={10}>
          <Table variant='simple'>
            <TableCaption>Scores are subject to your participation</TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>Rank</Th>
                <Th>Name</Th>
                <Th isNumeric>Score </Th>
              </Tr>
            </Thead>
            <Tbody>

              {data.map((item) => {
                return (
                  <Tr>
                    <Td isNumeric>{item.rank}</Td>
                    <Td><HStack alignItems="center" gridGap={2}>
                      <Avatar src={item.photo} size={'sm'} />
                      <Text>{item.name}</Text>
                    </HStack>
                    </Td>
                    <Td isNumeric>{item.score}</Td>
                  </Tr>
                )
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th isNumeric>Rank</Th>
                <Th>Name</Th>
                <Th isNumeric>Score </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </>)}
      <LeaderboardPoints />
    </Flex>

  )
}

export default LeaderboardContent