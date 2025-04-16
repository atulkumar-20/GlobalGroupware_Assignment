import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { User, UserResponse } from '../types/user';
import { useAuth } from '../contexts/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import EditUserModal from './EditUserModal';
import { SearchBar } from './SearchBar';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { token, setToken, userEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  const searchQuery = searchParams.get('search') || '';
  const filterBy = searchParams.get('filterBy') || 'all';

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchTerm = searchQuery.toLowerCase();
      const matchesSearch =
        user.first_name.toLowerCase().includes(searchTerm) ||
        user.last_name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm);

      switch (filterBy) {
        case 'name':
          return (
            user.first_name.toLowerCase().includes(searchTerm) ||
            user.last_name.toLowerCase().includes(searchTerm)
          );
        case 'email':
          return user.email.toLowerCase().includes(searchTerm);
        default:
          return matchesSearch;
      }
    });
  }, [users, searchQuery, filterBy]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get<UserResponse>(
          `https://reqres.in/api/users?per_page=6&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, token, navigate]);

  const handleEdit = async (data: {
    first_name: string;
    last_name: string;
    email: string;
  }) => {
    if (!editingUser) return;

    try {
      await axios.put(`https://reqres.in/api/users/${editingUser.id}`, data);
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...data } : user,
        ),
      );
      setSuccessMessage('User updated successfully');
      setEditingUser(null);
    } catch {
      setError('Failed to update user');
    }
  };

  const handleDelete = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      setSuccessMessage('User deleted successfully');
    } catch {
      setError('Failed to delete user');
    }
  };

  const handleSearch = (search: string) => {
    setSearchParams((prev) => {
      if (search) {
        prev.set('search', search);
      } else {
        prev.delete('search');
      }
      return prev;
    });
  };

  const handleFilterChange = (filter: string) => {
    setSearchParams((prev) => {
      prev.set('filterBy', filter);
      return prev;
    });
  };

  const canEditUser = (userData: User) => {
    return userData.email === userEmail;
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold">User List</h1>
        <p className="text-sm text-gray-600 mt-1">
          Note: Only {userEmail} can edit their profile. Use particular email to edit that user
        </p>
      </div>

      <div className="flex justify-end mb-8">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="mb-6">
        <SearchBar
          searchQuery={searchQuery}
          filterBy={filterBy}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((userData) => (
          <div
            key={userData.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <img
                src={userData.avatar}
                alt={`${userData.first_name} ${userData.last_name}`}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {userData.first_name} {userData.last_name}
                </h2>
                <p className="text-gray-600 mt-1">{userData.email}</p>
                <div className="mt-4 flex justify-center gap-2">
                  {canEditUser(userData) && (
                    <>
                      <button
                        onClick={() => setEditingUser(userData)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(userData.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && !loading && (
        <div className="text-center text-gray-500 mt-8">
          No users found matching your search criteria
        </div>
      )}

      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50 hover:bg-indigo-700 transition-colors"
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`w-8 h-8 rounded-full ${
                  page === pageNum
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } flex items-center justify-center transition-colors`}
              >
                {pageNum}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50 hover:bg-indigo-700 transition-colors"
        >
          Next
        </button>
      </div>

      {/* Page Info */}
      <div className="mt-4 text-center text-gray-600">
        Page {page} of {totalPages}
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSubmit={handleEdit}
        />
      )}
    </div>
  );
}
