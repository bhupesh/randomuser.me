import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { itemsPerPage } from './config/config';
import { fetchUsers } from './utils/utils';
import UserInfoRow from './components/UserInfoRow/UserInfoRow';
import SearchUserForm from './components/SearchUserForm/SearchUserForm';
import CountryChart from './components/CountryChart/CountryChart';
import Pagination from './components/Pagination/Pagination';
import './App.css';

function App() {
  /**
   * use one time only, to store initialized data, and to repopulate after
   * filter text box is cleared
   */
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortConfig, setSortConfig] = useState({ direction: 'asc' });

  /**
   * Get data from randomuser.me
   */
  useEffect( () => {
    const asyncFetchUsers = async () => {
      const response = await toast.promise(
        fetchUsers(),
        {
          pending: 'Fetching data...',
          success: '',
          error: 'Something went wrong.'
        }
      );

      if (response.ok) {
        const responseJson = await response.json();
        // set initial data of users
        setUsers(responseJson.results);
        // set all users to filtered users as there is no filter criteria yet
        setFilteredUsers(responseJson.results);
      } else {
        setErrorMessage('Something went wrong.');
      }
    };

    asyncFetchUsers();
  }, []);

  // Once the users is populated, set it to filteredusers variable
  useEffect(() => {
    setFilteredUsers([...users]);
  }, [users.length]);

  /* SORT */
  React.useMemo(() => {
    const sortedUsers = [...filteredUsers];

    if (sortConfig.hasOwnProperty('key')) {
      switch (sortConfig.key) {
        case 'name':
          sortedUsers.sort((a, b) => {
            if (sortConfig.direction === 'asc') return a[sortConfig.key].first.localeCompare(b[sortConfig.key].first);
            return b[sortConfig.key].first.localeCompare(a[sortConfig.key].first);
          });
          break;

        case 'location':
          sortedUsers.sort((a, b) => {
            if (sortConfig.direction === 'asc') {
              return a[sortConfig.key].country.localeCompare(b[sortConfig.key].country);
            }
            return b[sortConfig.key].country.localeCompare(a[sortConfig.key].country);
          });
          break;
        case 'date':
          sortedUsers.sort((a, b) => {
            if (sortConfig.direction === 'asc') {
              return new Date(a.registered[sortConfig.key]) - new Date(b.registered[sortConfig.key]);
            }
            return new Date(b.registered[sortConfig.key]) - new Date(a.registered[sortConfig.key]);
          });
          break;

        default:
          break;
      }
    }
    setFilteredUsers([...sortedUsers]);
  }, [users, sortConfig]);

  const sortClickHandler = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'des';
    }
    setSortConfig({ key, direction });
  };
  /* END SORT */

  const delay = 500;  // delay function execution in debounce, for onChange event

  const usernameFilter = (ev) => {
    const searchStr = ev.target.value;
    const tempUsers = users.filter((user) => user.name.first.toLowerCase().includes(searchStr) || user.name.last.toLowerCase().includes(searchStr));
    setFilteredUsers(tempUsers);
  };

  const usernameFilterDebounced = debounce(usernameFilter, delay);

  const userLocationFilter = (ev) => {
    const searchStr = ev.target.value;
    const tempUsers = users.filter((user) => user.location.city.toLowerCase().includes(searchStr) || user.location.country.toLowerCase().includes(searchStr));
    setFilteredUsers(tempUsers);
  };

  const userLocationFilterDebounced = debounce(userLocationFilter, delay);

  const userDateFilter = (ev) => {
    const searchStr = ev.target.value;
    const tempUsers = users.filter((user) => user.registered.date.startsWith(searchStr));
    setFilteredUsers(tempUsers);
  };

  const userDateFilterDebounced = debounce(userDateFilter, delay);

  const userPhoneFilter = (ev) => {
    const searchStr = ev.target.value;
    const tempUsers = users.filter((user) => user.phone.replace(/\D/g, '').includes(searchStr));
    setFilteredUsers(tempUsers);
  };

  const userPhoneFilterDebounced = debounce(userPhoneFilter, delay);

  /* PAGINATION */

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedUsers = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredUsers.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredUsers]);

  /* END PAGINATION */

  const deleteHandler = (email) => {
    const idx = users.findIndex((user) => user.email === email);
    if (idx !== -1) {
      // eslint-disable-next-line
      const deletedUser = users.splice(idx, 1);
      setUsers([...users]);
    }
  };

  return (
    <Container className="App">
      <ToastContainer autoClose={1000} />
      <Row className="mt-4">
        <Col lg={8}><h2 className="my-4">Search users from randomuser.me</h2></Col>
        <Col lg={4}><CountryChart users={users} /></Col>
      </Row>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <SearchUserForm
        sortClickHandler={sortClickHandler}
        usernameFilter={usernameFilterDebounced}
        userLocationFilter={userLocationFilterDebounced}
        userDateFilter={userDateFilterDebounced}
        userPhoneFilter={userPhoneFilterDebounced}
      />
      {paginatedUsers.map((user) => (
        <UserInfoRow
          key={user.login.uuid}
          user={user}
          deleteHandler={deleteHandler}
        />
      ))}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalRecords={filteredUsers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

    </Container>
  );
}

export default App;
