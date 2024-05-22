import { LitElement, css, html } from 'lit'
import { addOrUpdateProductToCarrito, deleteProductFromCarrito, getAll, getCarrito, getOneCategory } from './jsonController';

export class MyDashboard extends LitElement {
  static get properties() {
    return {
      page: { type: String },
      pageTitle: { type: String },
      data: { type: Array },
      numCarrito: { type: Number }

    };
  }

  constructor() {
    super();
    this.pageTitle = 'Todos los Productos'
    this.data = [];
    this.numCarrito = this.getNumberCarrito();
    
  }

  updated(changedProperties) {
    if (changedProperties.has('page')) {

      this.handlePageSelected();
    }
  }

  async getNumberCarrito() {
    this.data = await getCarrito();
    this.numCarrito = this.data.reduce((total, producto) => total + producto.cantidad, 0);
    // console.log(this.numCarrito)
    this.actualizarNumberCarrito();
  }
  // Función para manejar el cambio en page
  async handlePageSelected() {

    if (this.page == 'allProducts') {
      this.pageTitle = 'Todos los Productos'
      this.data = await getAll();
      // console.log(this.data)

    }
    else if (this.page == 'abrigos') {
      this.pageTitle = 'Abrigos'
      this.data = await getOneCategory('abrigo');
      // console.log(this.data)
    }
    else if (this.page == 'pantalones') {
      this.pageTitle = 'Pantalones'
      this.data = await getOneCategory('pantalon');
      // console.log(this.data)
    }
    else if (this.page == 'camisetas') {
      this.pageTitle = 'Camisetas'
      this.data = await getOneCategory('camiseta');
      // console.log(this.data)
    }
    else if (this.page == 'carrito') {
      this.pageTitle = 'Tu Carrito'
      this.data = await getCarrito();

    }
    this.requestUpdate();
  }

  async addCarrito(item) {

    let newProduct = {};
    let nameCategorie = item.id.split('-')[0];
    let numId = item.id.split('-')[1];
    newProduct.categorie = nameCategorie;
    newProduct.idInCategorie = numId;
    newProduct.nombre = item.nombre;
    newProduct.imagen = item.imagen;
    newProduct.precio = item.precio;
    newProduct.cantidad = 1;


    addOrUpdateProductToCarrito(newProduct, false)

    // Esperar a que se complete la actualización del componente antes de emitir el evento
    await this.updateComplete;
    this.numCarrito++;
    this.actualizarNumberCarrito();
  }

  render() {
    return html`
        <section class="dashboard-container">
            <article>
                <div class="titulo__pagina">
                    <h1>${this.pageTitle}</h1>
                </div>
                <!-- se verifica si la pagina es carrito y mostrar un html diferente en consecuencia. -->
                <div class="articulos">
                    ${this.page === 'carrito' ? this.renderCarrito() : this.renderArticulos()}
                </div>

            </article>
        </section>
        `

  }
  renderArticulos() {
    return html`
          ${this.data.map(item => html`
            <div class="articulo">
              <div class="articulo__foto">
                <img src="${item.imagen}" alt="${item.nombre}">
              </div>
              <div class="articulo__info">
                <div>
                  <h3>${item.nombre}</h3>
                </div>
                <div>
                  <p>Precio: ${this.agregarSeparadorDeMiles(item.precio)}</p>
                  <a @click="${() => this.addCarrito(item)}" href="#">Agregar</a>
                </div>
              </div>
            </div>
          `)}
        `;
  }
   agregarSeparadorDeMiles(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
 }

  renderCarrito() {
    return html`
          ${this.data.map(item => html`
            <div class="articulo">
              <div class="articulo__foto">
                <img src="${item.imagen}" alt="${item.nombre}">
              </div>
              <div class="articulo__info">
                <div>
                  <h3>${item.nombre}</h3>
                </div>
                <div class="product_info">
                  <p><strong>Precio:</strong> $${this.agregarSeparadorDeMiles(item.precio)} Und</p>
                  <p><strong>Cantidad:</strong> ${item.cantidad}</p>
                </div>
                <div class="controls_carrito">
                  <div>  
                    <button @click="${() => this.incrementarCantidad(item)}">+</button>
                    <button @click="${() => this.decrementarCantidad(item)}">-</button>
                  </div>
                  <button @click="${() => this.removeItem(item)}">Eliminar</button>
                </div>
              </div>
            </div>
          `)}
          <div class="total">
            <h3>Total: $${this.agregarSeparadorDeMiles(this.calcularTotal())}</h3>
          </div>
          <button class="boton_comprar" @click="${this.realizarCompra}">Realizar Compra</button>
        `;
  }


  incrementarCantidad(item) {
    // Lógica para incrementar la cantidad del artículo
    item.cantidad++;
    this.numCarrito++;
    this.actualizarNumberCarrito()
    addOrUpdateProductToCarrito(item, true);
    // console.log(item.cantidad);}

    // this.actualizarNumberCarrito() //incrementa  el boton del navbar
    this.requestUpdate();
  }

  decrementarCantidad(item) {
    // Lógica para decrementar la cantidad del artículo

    item.cantidad--;
    this.numCarrito--;
    if (item.cantidad === 0) {
      this.removeItem(item);
      this.data
      return;
    }
    else if (item.cantidad > 0) {
      addOrUpdateProductToCarrito(item, true);
    }

    this.actualizarNumberCarrito()
    this.requestUpdate();
  }

  removeItem(item) {
    // Lógica para eliminar el artículo del carrito
    //logica para eliminarlo del array actual data
    this.data = this.data.filter(i => i.id !== item.id || i.categorie !== item.categorie);
    
    
    //se llama a la funcion que elimina el producto en la base de datos
    deleteProductFromCarrito(item.id)
    
    this.requestUpdate();
    this.numCarrito -= item.cantidad
     this.actualizarNumberCarrito()
  }

  actualizarNumberCarrito() {

    this.dispatchEvent(new CustomEvent('changeCarrito', {
      detail: this.numCarrito,
      bubbles: true,
      composed: true
    }));
  }

  calcularTotal() {
    return this.data.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  realizarCompra() {
    // Lógica para realizar la compra
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

        * {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-style: normal;
            box-sizing: border-box;
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
        height: 90%;
        padding-top: 3.5em;
      }
      .dashboard-container article {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        width: 98%;
        height: 97%;
        overflow-y: hidden;
        border: solid 3px var(--color-primary);
        box-sizing: border-box;
      
      
      }
      
      .titulo__pagina {
        width: 70%;
        height: 8%;
        display: flex;
        align-items: center;
        position: fixed;
        background: #fffbf2e1;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px); /* Desenfoque del fondo */
      }
      
      .titulo__pagina h1 {
        margin-left: 1.5em;
        color: var(--color-primary);
        text-transform: capitalize;
      
      }
      
      .articulo {
        width: 20vw;
        height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        box-shadow: 1px 0px 10px var(--color-secundary);
        border-radius: 10px;
        box-sizing: border-box;
        margin: 0.5em;
        background: white;
      }
      
      .articulo__foto {
        width: 100%;
        height: 100%;
        overflow: hidden;
      
      }
      
      .articulo__foto img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      
      .articulo__info {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        gap: 1em;
        background: var(--color-primary);
        border-radius: 10px;
      }
      
      .articulo__info div:first-child,
      .articulo__info div:last-child {
        display: flex;
        align-items: center;
        width: 90%;
        margin: 0.5em 0em;
      }
      
      .articulo__info div:first-child {
        background: none;
      }
      
      .articulo__info div:first-child h3 {
        color: var(--color-base);
        text-transform: capitalize;
        font-weight: 500;
        font-size: 1em;
      }
      
      .articulo__info div:last-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        align-content: center;
    }
      
      .articulo__info div:last-child p {
        color: var(--color-secundary);
        font-size: 1.1em;
        font-weight: 500;
      
      }
      
      
      .articulo__info div:last-child a {
        color: var(--color-primary);
        font-size: 1em;
        font-weight: 500;
        background: var(--color-secundary);
        padding: 0.3em 0.7em;
        border-radius: 10px;
        text-decoration: none;
        text-transform: capitalize;
        border: solid 2px transparent;
      }
      
      .articulo__info div:last-child a:hover {
        box-shadow: 0px 0px 3px var(--color-secundary);
        border-radius: 5px;
        text-decoration: none;
        text-transform: capitalize;
        border: solid 2px var(--color-base);
        transition: all 0.2s ease-in-out;
      }
      .product_info{
        background: var(--color-base);
        width: 98%;
        height: fit-content;
        padding: 0.2em ;
        border-radius: 7px;
        color: var(--color-primary);
        
      }
      
      .controls_carrito {
        gap: 0.5em;
        color: var(--color-primary);
        flex-direction: row-reverse;
        
    }
    
    
    .controls_carrito :first-child button {
      width: 13%;
      height: 73%;
      font-size: 1.3em;
      padding: 0;
      outline-style: none;
      border-style: none;
      border: none;
      border-radius: 5px;
      margin: 0.1em;
  }
    .controls_carrito :first-child button:hover{
      background: var(--color-secundary)
    }
    

    .controls_carrito >:last-child {
      color: var(--color-primary);
      font-size: 1em;
      font-weight: 500;
      background: var(--color-secundary);
      padding: 0.3em 0.7em;
      border-radius: 10px;
      text-decoration: none;
      text-transform: capitalize;
      border: solid 2px transparent;
    }
    
    .controls_carrito >:last-child:hover {
      box-shadow: 0px 0px 3px red;
      border-radius: 5px;
      text-decoration: none;
      text-transform: capitalize;
      transition: all 0.2s ease-in-out;
      
    }
    .total {
      color: var(--color-primary);
      position: fixed;
      top: 1.2em;
      right: 3.5em;
      font-size: 1.3rem;
    }
    .boton_comprar {
      position: fixed;
      bottom: 5em;
      right: 3em;
      color: var(--color-primary);
      font-size: 1.2em;
      font-weight: 500;
      background: var(--color-secundary);
      padding: 0.3em 0.7em;
      border-radius: 10px;
      text-decoration: none;
      text-transform: capitalize;
      border: solid 2px transparent;
      font-weight: bold;
    }
    .boton_comprar:hover {
      box-shadow: 0px 0px 3px var(--color-base);
      border-radius: 5px;
      text-decoration: none;
      text-transform: capitalize;
      transition: all 0.2s ease-in-out;

    }

      @media (width < 951px) {
        .total {
          color: var(--color-primary);
          position: fixed;
          top: 1.2em;
          right: 2em;
          font-size: 1rem;
        }
        .boton_comprar {
          position: fixed;
          top: auto;
          bottom : 5em;
          right: 2em;
          
        }

        .controls_carrito :first-child button {
          width: 40%;
          height: 73%;
          font-size: 1.3em;
          
      }
        .titulo__pagina {
          width: 100%;
          height: 8%;
          display: flex;
          align-items: center;
          position: fixed;
          background: #fffbf2e1;
          backdrop-filter: blur(5px); /* Desenfoque del fondo */
        }
        
        .titulo__pagina h1 {
          margin-left: 1.5em;
          color: var(--color-primary);
          text-transform: capitalize;
        
        }
      
        .dashboard-container {
            grid-area: dashboard;
            background: var(--color-base);
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: start;
            overflow: hidden;
            
        }
      
        .articulos {
            display: flex;
            align-items: start;
            justify-content: center;
            flex-wrap: wrap;
            overflow-y: scroll;
            width: 100%;
            height: 90%;
            background: none;
        }
      
        .dashboard-container article {
            border: none;
            width: 100%;
            height: 88%;
          
        }
      
        .articulo {
            width: 45%;
            height: 50vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            box-shadow: 1px 0px 10px var(--color-secundary);
            border-radius: 10px;
            box-sizing: border-box;
            margin: 0.5em;
            background: white;
        }
      
        
      }

    `
  }


}

customElements.define('my-dashboard', MyDashboard);