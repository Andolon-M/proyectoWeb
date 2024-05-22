import { LitElement, css, html } from 'lit'
import './my-dashboard.js';
import icon_abrigo from './assets/abrigo.svg'
import icon_pantalones from './assets/pantalones.svg'
import { getCarrito } from './jsonController.js';

export class MyNavbar extends LitElement {
  static properties() {
    return {
      pageSelected: { type: String },
      numCarrito: { type: Number }
    };
  }

  constructor() {
    super();
    this.pageSelected = "allProducts"; // Selección inicial
    this.numCarrito = 0;
    this.writeNumberCarrto();
  }

 


  pagination(e) {
    let currentLi = e.target.closest('li');
    const listItems = currentLi.parentElement.querySelectorAll('li');
    // Eliminar la clase 'active' de todos los elementos <li>
    listItems.forEach(item => item.classList.remove('active'));
    // Agregar la clase 'active' solo al elemento seleccionado
    currentLi.classList.add('active');
    this.pageSelected = currentLi.id;
    this.requestUpdate();
  }

  async writeNumberCarrto() {
    let productosCarrito = await getCarrito()
    this.numCarrito = productosCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    console.log("soy el evento ")
    

    console.log(productosCarrito.reduce((total, producto) => total + producto.cantidad, 1))
    this.requestUpdate();
    
  }

  handleIncrementarCantidad() {
    this.writeNumberCarrto();
  }

  render() {
    return html`
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div class="body">
        
          <section class="sidebar">
          <article>
            <header class="header">
              <h1>CampusShop</h1>
            </header>
            <navbar>
                <div class="navbar">
                    <ul>
                        <li id="allProducts" class="active" @click="${this.pagination}" >
                            <a href="#"> 
                                <i class='bx bxs-store '></i>
                                <span>todos los productos</span>
                            </a>
                        </li>
                        <li id="abrigos" @click="${this.pagination}"><a href="#"> <img class="icono-nav" src=${icon_abrigo} alt="blank"> <span>abrigos</span></a></li>
                        <li id="camisetas" @click="${this.pagination}"><a href="#"> <i class='bx bxs-t-shirt'></i><span>camisetas</span></a></li>
                        <li id="pantalones" @click="${this.pagination}"><a href="#"> <img class="icono-nav" src=${icon_pantalones} alt="blank"><span>pantalones</span></a></li>
                    </ul>
                    <ul>
                        <li id="carrito" @click="${this.pagination}"><a href="#"><i class='bx bxs-cart'></i><span>carritos</span><small class="num_carritos">${this.numCarrito}</small></a></li>
                    </ul>
                </div>
            </navbar>

            <footer>
              <p> <i class='bx bx-copyright'></i> 2023 Camper </p>
            </footer>
          </article>
        </section>

        <my-dashboard page="${this.pageSelected}"  @changeCarrito="${this.handleIncrementarCantidad}"></my-dashboard>
       
        </div>
        `

  }

  static get styles() {
    return css`

      
      :root {
        --color-primary: #33211D;
        --color-secundary: #CDA16B;
        --color-base: #FFFBF2;

        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        /* line-height: 1.5; */
        font-weight: 400;


      /* configuracion para permitir el modo oscuro */
        
        /* color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #242424; */


        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      @media (prefers-color-scheme: light) {
      :root {
        color: #213547;
        background-color: #ffffff;
      }
      }

      * {
        margin: 0em 0em 0em 0em;
        padding: 0em 0em 0em 0em;
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
      } 

       navbar {
        width: 100%;
        height: 72%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      
      }
       .navbar {
        width: 97%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 3em;
        justify-content: space-around;
        background: var(--color-base);
        border-radius: 10px;
      }
      
      .icono-nav {
        width: 1.2em;
        height: auto;
      
      }
      
      .navbar ul {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: flex-start;
        list-style-type: none;
        text-transform: capitalize;
        gap: 0.5em;
        margin: 1em;
        margin-left: 1em;
      }
      
      .navbar ul li {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        border-top-right-radius: 0%;
        border-bottom-right-radius: 0%;
        padding: 0.1em;
        border-right: solid 2px transparent;
        border: solid 2px transparent;
        background: none;
      }
      
      .active {
        border: solid 2px var(--color-primary) !important;
      }
      
      .navbar ul li:hover {
        box-sizing: border-box;
        border-color: var(--color-secundary);
        border-right: solid 2px transparent;
        width: 96%;
        transition: border-color 0.3s ease-in-out;
      
      }
      
      .navbar ul li a {
        text-decoration: none;
        color: var(--color-primary);
        font-size: 1.1em;
        font-weight: 600;
        gap: 0.5em;
        padding: 0.5rem;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      
      .navbar ul li a i {
        color: var(--color-primary);
        font-size: 1.3em;
      
      }
      
      .num_carritos {
        width: 2em;
        height: 2em;
        background: var(--color-secundary);
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .body {
        display: grid;
        width: 100%;
        height: 100vh;
        /* place-items: center; */
        min-width: 320px;
        min-height: 100vh;
        grid-template-columns: 27% auto;
        grid-template-rows: 100%;
        grid-template-areas:
            "sidebar dashboard"
        ;
      
      }
      
      .sidebar {
        grid-area: sidebar;
        background: var(--color-base);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: center;
        padding-right: 5em;
      }
      
      .sidebar article {
      
        background: var(--color-primary);
        width: 96%;
        height: 97%;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      
      .dashboard-container {
        grid-area: dashboard;
        background: var(--color-base);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
      }
      
      .articulos {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: scroll;
        width: 100%;
        height: 91%;
      }
      
      .dashboard-container article {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        width: 98%;
        height: 97%;
        border: solid 3px var(--color-primary);
        box-sizing: border-box;
      
      
      }
      
      .header {
        width: 100%;
        height: 15%;
        margin-bottom: 1em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      
      }
      
      .header h1 {
        font-size: 2em;
        font-weight: 600;
        color: var(--color-base);
        margin-left: 0.5em;
      }
      
      
      
      
      
      footer {
        width: 100%;
        height: 10%;
        display: flex;
        align-items: end;
        flex-wrap: wrap;
        justify-content: center;
        font-size: 1em;
        color: var(--color-secundary);
      }
      
      
      footer p {
        margin: 1em;
      }
      
            
        `
  }


}

customElements.define('my-navbar', MyNavbar);