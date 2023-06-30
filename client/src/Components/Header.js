import SearchBar from "./SearchBar";
function Header() {
    return (
        <header>
            <h1>Trader Junks
                <SearchBar />
            </h1>
        </header>
    );
}

export default Header;