const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000','https://pizzeria-napoli.onrender.com','https://pizzeria-napoli.vercel.app'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());


const { verifyToken, crearToken } = require('./Middlewares/authMiddleware');
const { checkCredenciales } = require('./Middlewares/checkCredenciales');
const { saveUser, 
    getProductos, 
    getProducto, 
    addProducto,
modificarProducto,
createOrder,
getOrderDetailsById,
modificarStatusOrden,
updateUserProfile,
getMyOrders } = require('./Models/consultas');

//Rutas Login

app.post('/api/login', checkCredenciales, crearToken);
app.post('/login', checkCredenciales, crearToken);

app.post('/api/crearUsuario', async (req, res) => {
  const usuario = req.body;
  try {
    const user = await saveUser(usuario);
    console.log(`Respuesta: ${user}`);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(err.code).json(err.message);
  }
});

app.get('/api', async (req, res) =>{
    res.status(200).json({ message: "Bienvenido a la API Proyecto Final" });
})

app.get('/api/productos', async (req, res) =>{
    const productos = await getProductos();
    res.status(200).json(productos);
})

app.get('/api/producto/:partnumber', async (req, res) =>{
    const producto = await getProducto(req.params.partnumber);
    res.status(200).json(producto);
})

app.post('/api/admin/crearProducto', verifyToken, async (req, res) =>{
    const { userId, tipo } = req;
    if (tipo !== Admin) {
        res.status(401).json({ message: "No tienes permisos para crear productos" });
    }
    else{

    const producto = req.body;
    try {
        const productoCreado = await addProducto(producto);
        res.status(201).json(productoCreado);
    } catch (err) {
        console.log(err);
        res.status(err.code).json(err.message);
    }
    }
});

const Admin = 'admin';

app.put('/api/admin/modificarProducto/:id', verifyToken, async (req, res) =>{
    const { userId, tipo } = req;
    if (tipo !== Admin) {
        res.status(401).json({ message: "No tienes permisos para modificar productos" });
    }
    else{
    const { id } = req.params;
    const producto = req.body;
    producto.id = id;
    console.log(producto);
    try {
        const productoModificado = await modificarProducto(producto);
        if (productoModificado) {
            res.status(200).json({ producto: productoModificado, message: "Producto modificado" });
        }
        else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (err) {
        console.log(err);
        res.status(err.code).json(err.message);
    }
    }
})

app.put('/api/admin/modificarStatusOrden/:pedido_id', verifyToken, async (req, res) =>{
    const { userId, tipo } = req;
    if (tipo !== Admin) {
        res.status(401).json({ message: "No tienes permisos para modificar productos" });
    }
    else{
    const { pedido_id } = req.params;
    const {status} = req.body;
    console.log(status);
    try {
        const pedidoModificado = await modificarStatusOrden(pedido_id, status);
        if (pedidoModificado) {
            res.status(200).json({ pedido: pedidoModificado, message: "Pedido modificado", nuevoStatus: status });
        }
        else {
            res.status(404).json({ message: "Pedido no encontrado" });
        }
    } catch (err) {
        console.log(err);
        res.status(err.code).json(err.message);
    }
    }
});

app.get('/api/pedidos', verifyToken, async (req, res) =>{
    const { userId, tipo } = req;
    const pedidos = await getMyOrders(userId);
    res.status(200).json(pedidos);
});

app.post('/api/pedidos', verifyToken, async (req, res) =>{
    const { userId, tipo } = req;
    const pedido = req.body;
    pedido.usuario_id = userId;
    try {
        const pedidoCreado = await createOrder(pedido);
        res.status(201).json({pedido: pedidoCreado, message: "Pedido creado con exito"});
    } catch (err) {
        console.log(err);
        res.status(err.code).json(err.message);
    }
});

app.post('/api/updateUserProfile',verifyToken, async (req, res) =>{
    const { userId, tipo } = req;
    const { nombre, apellido, direccion, telefono } = req.body;
    try {
        const user = await updateUserProfile(userId, nombre, apellido, direccion, telefono);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(err.code).json(err.message);
    }
});

app.get('/api/userProfile', verifyToken, async (req, res) =>{
    const { userId, tipo } = req;
    const user = await getUserProfile(userId);
    res.status(200).json(user);
});

app.get('/api/pedidos/:pedido_id', verifyToken, async (req, res) =>{
    const { pedido_id } = req.params;
    const pedido = await getOrderDetailsById(pedido_id);
    res.status(200).json(pedido);
});

app.get("*", (req, res) => {
    res.status(404).json({ message: "No existe la ruta" });
  });
  app.post("*", (req, res) => {
    res.status(404).json({ message: "No existe la ruta" });
  });

app.listen(3000, () => {
  console.log('Server is running on port ');
});


module.exports = app;



