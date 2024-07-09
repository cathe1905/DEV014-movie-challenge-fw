import '../styles/navBar.css'; // Asegúrate de tener tu archivo de estilos CSS para personalizar el Navbar

const Navbar = () => {
  return (
    <div className="navbar mx-5 my-2">
      <div className="navbar__left">
        <h1 className='spectral-extrabold'>DevFlix</h1>
      </div>
      <div className="navbar__right">
        <button className="navbar__button">Botón</button>
        <div className="navbar__icons">
            <img src="" alt="" />
            <img src="" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;