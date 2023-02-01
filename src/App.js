import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import '@fontsource/roboto/400.css';
import '@fontsource/poppins/700.css';
import Main from './pages/Main';
import PrivateRoute from './utils/PrivateRoute';
import ProtectedRoute from './utils/ProtectedRoute';
import Admin from './pages/Admin';
import Event from './pages/Event';
import CreateEvent from './pages/CreateEvent';
import GetAllEvents from './pages/GetAllEvents';
import Leaderboard from './pages/Leaderboard';
import EditEvent from './pages/EditEvent';
function App() {
  return (
    <ChakraProvider >
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>} />
        <Route path="/event/:id" element={
          <PrivateRoute>
            <Event />
          </PrivateRoute>} />
        <Route path="/leaderboard" element={
          <PrivateRoute>
            <Leaderboard />
          </PrivateRoute>} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>} />
        <Route path="/admin/create" element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>} />
        <Route path="/admin/listevents" element={
          <ProtectedRoute>
            <GetAllEvents />
          </ProtectedRoute>} />
          <Route path="/admin/event/:id" element={
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
