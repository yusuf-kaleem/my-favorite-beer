import Search from '../Search/Search'

function Header() {
    return (
        <div className="header" >
         {/* Beer Logo */}
        <img alt="logo" className="m10" src={"https://images.punkapi.com/v2/58.png"} height="60" alt="weather-logo" />
         {/* Main Heading */}
        <span> My Favorite Beer </span> 
         {/* Search Componenet */}
         <Search></Search>

      </div>
        );
  }
  
  export default Header;
  