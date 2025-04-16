import { ChangeEvent } from 'react';

interface SearchBarProps {
  searchQuery: string;
  filterBy: string;
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

export const SearchBar = ({
  searchQuery,
  filterBy,
  onSearch,
  onFilterChange,
}: SearchBarProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="sm:w-48">
        <select
          value={filterBy}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Fields</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>
    </div>
  );
};
