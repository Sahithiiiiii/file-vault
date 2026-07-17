import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
function SearchBar({ search, setSearch, fetchFiles }) {
    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        fetchFiles(value);
    };
    return (
    <div className="search-container">
        <FaSearch className="search-icon"/>
        <input
            className="search-input"
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={handleChange}
        />
        <FiFilter className="filter-icon"/>
    </div>
);
}
export default SearchBar;