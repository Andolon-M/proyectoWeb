import { LitElement, css, html } from 'lit'
import { addOrUpdateProductToCarrito, deleteProductFromCarrito, getAll, getCarrito, getOneCategory } from './jsonController';

export class MyDashboard extends LitElement {
    static get properties() {
        return {
            page: { type: String },
            pageTitle: { type: String },
            data: { type: Array },

        };
    }

    constructor() {
        super();
        this.pageTitle = 'Todos los Productos'
        this.data = [];

    }

    updated(changedProperties) {
        if (changedProperties.has('page')) {

            this.handlePageSelected();
        }
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

            console.log(this.data)
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
                  <p>Precio: ${item.precio}</p>
                  <a @click="${() => this.addCarrito(item)}" href="#">Agregar</a>
                </div>
              </div>
            </div>
          `)}
        `;
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
                <div>
                  <p>Precio: ${item.precio}</p>
                  <p>Cantidad: ${item.cantidad}</p>
                </div>
                <div>
                  <button @click="${() => this.incrementarCantidad(item)}">+</button>
                  <button @click="${() => this.decrementarCantidad(item)}">-</button>
                  <button @click="${() => this.removeItem(item)}">Eliminar</button>
                </div>
              </div>
            </div>
          `)}
          <div class="total">
            <h3>Total: ${this.calcularTotal()}</h3>
          </div>
          <button @click="${this.realizarCompra}">Realizar Compra</button>
        `;
    }


    incrementarCantidad(item) {
        // Lógica para incrementar la cantidad del artículo
        item.cantidad++;

        addOrUpdateProductToCarrito(item, true);
        // console.log(item.cantidad);}

        // this.actualizarNumberCarrito() //incrementa  el boton del navbar
        this.requestUpdate();
    }

    decrementarCantidad(item) {
        // Lógica para decrementar la cantidad del artículo

        item.cantidad--;
        if (item.cantidad === 0) {
            this.removeItem(item);
            this.data
            return;
        }
        else if (item.cantidad > 0) {
            addOrUpdateProductToCarrito(item, true);
        }

        // this.actualizarNumberCarrito()//decrementa el boton del navbar
        this.requestUpdate();
    }

    removeItem(item) {
        // Lógica para eliminar el artículo del carrito
        //logica para eliminarlo del array actual data
        this.data = this.data.filter(i => i.id !== item.id || i.categorie !== item.categorie);

        this.actualizarNumberCarrito(); //actualiza el numero del navbar
        this.requestUpdate();

        //se llama a la funcion que elimina el producto en la base de datos
        deleteProductFromCarrito(item.id)

    }
    
    async actualizarNumberCarrito(){

        this.dispatchEvent(new CustomEvent('changeCarrito', {
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
      
.titulo__pagina {
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
  }
  
  .titulo__pagina h1 {
    margin-left: 1.5em;
    color: var(--color-primary);
    text-transform: capitalize;
  
  }
  
  .articulo {
    width: 20vw;
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
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
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
        `
    }


}

customElements.define('my-dashboard', MyDashboard);