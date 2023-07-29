import SearchBar from "./Components/SearchBar";
import ProductList from "./Components/ProductList";

function FilteredList() {
    return (
        <div>
            <ProductList filteredItems={SearchBar.filteredItems}/>
            <SearchBar />
        </div>
    )
}

export default FilteredList;