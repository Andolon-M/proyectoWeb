import fs from 'fs/promises';
const ipLocal = '127.0.0.1:5501'
const ipServer = '172.16.101.146:5642'
const addresIp = ipServer

export const getAll = async () => {
    let data = [];

    let camisetas = await getOneCategory('camiseta');
    
    // console.log(camisetas);
    data = data.concat(camisetas);

    let pantalones = await getOneCategory('pantalon');
    
    // console.log(pantalones);
    data = data.concat(pantalones);

    let abrigos = await getOneCategory('abrigo');
    
    // console.log(abrigos);
    data = data.concat(abrigos);

    
    // console.log(data);
    return data;
}

export const changeId = async (datos, nameCategorie) => {
    for (let item of datos) {
        item.id = nameCategorie +"-"+ item.id;
    }
}

export const getOneCategory = async (category) => {

    let res = await fetch(`http://${addresIp}/${category}`);
    // //local server
    // let res = await fetch(`http://localhost:5501/${category}`);
    let data = await res.json();
    changeId(data, category)
    return data;
}

export const generateId = async (data) => {
    // Obtener el ID más alto de la colección
    const highestId = data.reduce((maxId, item) => {
        return item.id > maxId ? item.id : maxId;
    }, 0);

    // Incrementar el ID más alto en 1 para obtener un nuevo ID único
    const newId = parseInt(highestId,10) + 1;

    return newId.toString();
};


export const getCarrito = async () => {
    //local
    //const res = await fetch('http://localhost:5501/carrito');
    
    const res = await fetch(`http://${addresIp}/carrito`);
    return await res.json();
};


export const addOrUpdateProductToCarrito = async (newProducto, isFromCarrito) => {
    try {
        // Obtener el carrito actual
        const data = await getCarrito();

        // Buscar si el producto ya existe en el carrito
        let productFound = false;
        for (let item of data) {
            if (item.categorie === newProducto.categorie && item.idInCategorie === newProducto.idInCategorie) {
                // Si el producto ya existe, aumentar la cantidad
                if (isFromCarrito){
                    item.cantidad =  newProducto.cantidad;
                }
                else{
                    item.cantidad ++;
                }
                
                
                productFound = true;

                // Realizar una solicitud PATCH para actualizar la cantidad del producto
                //local
                //await fetch(`http://localhost:5501/carrito/${item.id}`, {
                    await fetch(`http://${addresIp}/carrito/${item.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cantidad: item.cantidad })
                });
                break;
            }
        }

        // Si el producto no existe en el carrito, agregarlo con un nuevo ID
        if (!productFound) {
            const newId = await generateId(data);
            newProducto.id = newId;
            //local:
            //await fetch('http://localhost:5501/carrito', {
            await fetch(`http://${addresIp}/carrito`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProducto)
            });
        }

        console.log('Carrito actualizado exitosamente.');
    } catch (error) {
        console.error('Error al actualizar el carrito:', error);
    }
};

export const deleteProductFromCarrito = async (id) => {
    try {
        //local

        //await fetch(`http://localhost:5501/carrito/${id}`, {
        await fetch(`http://${addresIp}/carrito/${id}`, {
            method: 'DELETE'
        });
        console.log('Producto eliminado del carrito exitosamente.');
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
    }
};

