import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { itemsPerPage } from './config/config';
import UserInfoRow from './components/UserInfoRow/UserInfoRow';
import SearchUserForm from './components/SearchUserForm/SearchUserForm';
import CountryChart from './components/CountryChart/CountryChart';
import Pagination from './components/Pagination/Pagination';
import './App.css';
import { useGetRandomusersQuery } from './services/randomuser';

const loadingToastId = 'loading-toast';

function App() {
  /**
   * use one time only, to store initialized data, and to repopulate after
   * filter text box is cleared
   */
  const { data, error, isLoading } = useGetRandomusersQuery();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ direction: 'asc' });

  useEffect(() => {
    if (!data) return;
    setUsers([...data.results]);
  }, [data]);

  /**
   * Whenever user's array is changed, set the filtered users that is being used for pagination
   */
  useEffect(() => {
    // Once the users is populated, set it to filteredusers variable
    setFilteredUsers([...users]);
  }, [users]);

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
    const idx = filteredUsers.findIndex((user) => user.email === email);
    if (idx !== -1) {
      // eslint-disable-next-line
      const deletedUser = users.splice(idx, 1);
      setUsers([...users]);
    }
  };

  if (isLoading) {
    toast('Loading...', {
      type: 'info',
      position: toast.POSITION.TOP_CENTER,
      toastId: loadingToastId,
    });
    return <ToastContainer autoClose={3000} containerId="loading-toast-container" />;
  }

  if (users.length < 1) return '';

  return (
    <Container className="App">
      <Row className="mt-4">
        <Col lg={8}><h2 className="my-4">Search users from randomuser.me</h2></Col>
        <Col lg={4}><CountryChart users={users} /></Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}

      {users && (
        <SearchUserForm
          sortClickHandler={sortClickHandler}
          usernameFilter={usernameFilterDebounced}
          userLocationFilter={userLocationFilterDebounced}
          userDateFilter={userDateFilterDebounced}
          userPhoneFilter={userPhoneFilterDebounced}
        />
      )}

      {paginatedUsers && paginatedUsers.map((user) => (
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
