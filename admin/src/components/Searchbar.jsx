import { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar({ data, searchPlaceholder, pathPrefix }) {
    const [search, setSearch] = useState("");

    function handleChange(e) {
        setSearch(e.target.value);
    }

    function generateListItem() {
        const matchingItems = data.filter(item => (
            item.name.toLowerCase().includes(search.toLowerCase())
        ));

        if (search.length >= 2 && matchingItems.length > 0) {
            return (
                <ul className="search-dropdown-list">
                    {matchingItems.map((item) => (
                        <li className="search-dropdown-item" key={item._id}>
                            <Link to={`/${pathPrefix}/${item._id}/${item.name}`}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            );
        }
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder={searchPlaceholder}
            />
            {generateListItem()}
        </div>
    );
}

export default SearchBar;
