import Search from '../Search/Search'

function Header() {
    return (
        <div className="header" >
         

         {/*Title & Beer Logo */}
         <div className='flex_row bold_font'>
         <span style={{marginTop: "5px"}}> My Favorite Beer </span> 
         <img className="m10 rotate" src={"https://images.punkapi.com/v2/89.png"} height="80" alt="beer-logo" />
         </div>
     
         {/* Search Componenet */}
         <Search></Search>

      </div>
        );
  }
  
  export default Header;
  