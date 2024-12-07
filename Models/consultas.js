const {DB_CONFIG, SALT_ROUNDS} = require('../Config/secretKey');

const { Pool } = require("pg");
const format = require('pg-format');
const bcrypt = require("bcryptjs");

const pool = new Pool(DB_CONFIG);

const verificarCredenciales = async (usuario) => {
    const { email, password } = usuario;
    const query = format(
      "SELECT usuarios.email, perfil.tipo, usuarios.password, clientes.nombre, clientes.apellido, clientes.usuario_id from usuarios join perfil on usuarios.id = perfil.usuario_id join clientes on clientes.usuario_id = perfil.usuario_id where usuarios.email = %L",
      email
    );
    try {
      const result = await pool.query(query);
  
      if (
        !result.rows[0] ||
        !bcrypt.compareSync(password, result.rows[0].password)
      ) {
        throw { code: 401, message: "Credenciales incorrectas" };
      } else {
        return result.rows[0];
      }
    } catch (err) {
      console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      //throw { code: 400, message: "Error al verificar credenciales" };
    }
  };
  
  const saveUser = async (user) => {
    let { email, password, nombre, apellido, direccion, telefono } = user;
    console.log(user);
    email = email.toLowerCase();
    const checkEmail = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (checkEmail.rows.length > 0) {
      throw { code: 409, message: "El usuario ya existe" };
    }
    const passwordEncriptada = bcrypt.hashSync(password);
    const values = [email, passwordEncriptada];
    try{
        await pool.query('INSERT INTO usuarios (email, password) values ($1, $2)', values);
        const userId = (await pool.query('SELECT last_value from usuarios_id_seq')).rows[0].last_value;
        const respuesta = await pool.query('INSERT INTO clientes (usuario_id, nombre, apellido, direccion, telefono) values ($1, $2, $3, $4, $5) returning *', [userId, nombre, apellido, direccion, telefono]);
        return respuesta.rows[0];
    } catch (err) {
        console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      throw { code: 400, message: "Error al guardar usuario" };
    }
  };
  
  const getUser = async (email) => {
    const query = format(
      "SELECT * from usuarios where email = %L limit 1",
      email
    );
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      throw { code: 400, message: "Error al obtener usuario" };
    }
  };

  const getAllUsers = async () => {
    const query = "SELECT * from usuarios";
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      throw { code: 400, message: "Error al obtener usuarios" };
    }
  };

  const deleteUser = async (email) => {
    const query = format("DELETE FROM usuarios where email = %L", email);
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      throw { code: 400, message: "Error al eliminar usuario" };
    }
  };

  const modificarStatusOrden = async (pedido_id, status) => {
    const query = format("UPDATE pedidos SET status = %L WHERE id = %L", status, pedido_id);
    try {
      const result = await pool.query(query);
      if(result.rowCount === 0){
        return null;
      }
      else{
        return pedido_id;
      }
    } catch (err) {
      console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      throw { code: 400, message: "Error al modificar status del pedido" };
    }
  };

  const createOrder = async (order) => {
    const { usuario_id, total, tipo_de_pago, delivery, productos } = order;
    const query = format(
      "INSERT INTO pedidos (usuario_id, total, tipo_pago, delivery) VALUES (%L, %s, %L, %L) RETURNING *",
      usuario_id,
      total,
      tipo_de_pago,
      delivery
    );
    try {
      const result = await pool.query(query);
      productos.forEach(async (producto) => {
        const {producto_id, cantidad} = producto;
        const query = format("INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad) VALUES (%L, %L, %L)", result.rows[0].id, producto_id, cantidad);
        console.log(query);
        const resultDetalle = await pool.query(query);
        console.log(resultDetalle);
      });
      return order;
      
    } catch (err) {
      console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      throw { code: 400, message: "Error al crear pedido" };
    }
  };
  
  const updateUserProfile = async (userId, nombre, apellido, direccion, telefono) => {
    const query = format("UPDATE clientes SET nombre = %L, apellido = %L, direccion = %L, telefono = %L WHERE usuario_id = %L", nombre, apellido, direccion, telefono, userId);
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      throw { code: 400, message: "Error al actualizar perfil del usuario" };
    }
  };

  const getMyOrders = async (usuario_id) => {
    const query = format("SELECT * from pedidos where usuario_id = %L", usuario_id);
    try {
      const result = await pool.query(query);
      return result.rows;
    }
    catch (err) {
      console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      throw { code: 400, message: "Error al obtener pedidos" };
    }
  };

  const getOrderDetailsById = async (pedido_id) => {
    const query = format("select productos.nombre, detalle_pedido.cantidad from productos join detalle_pedido on productos.id = detalle_pedido.producto_id where detalle_pedido.pedido_id=%L", pedido_id);
    try {
      const result = await pool.query(query);
      return result.rows;
    }
    catch (err) {
        console.log(err);
        return null;
    }
};


  const addProducto = async (producto) => {
    const { partnumber, nombre, precio, picture_url, detalle } = producto;
    const query = format("INSERT INTO productos (partnumber, nombre, precio, picture_url, detalle) values (%L, %L, %s, %L, %L) returning *", partnumber, nombre, precio, picture_url, detalle);
    try {
        const result = await pool.query(query);
        return result.rows[0];
    } catch (err) {
      
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      if (err.code === "23505") {
        throw { code: 409, message: "El producto ya existe" };
      }
      throw { code: 400, message: "Error al crear producto" };
    }
  };

  const getProductos = async () => {
    const query = "SELECT * from productos";
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      throw { code: 400, message: "Error al obtener productos" };
    }
  };

  const getProducto = async (partnumber) => {
    const query = format("SELECT * from productos where partnumber = %L", partnumber);
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      throw { code: 400, message: "Error al obtener producto" };
    }
  };

  const modificarProducto = async (producto) => {
    const { id, partnumber,nombre, precio, picture_url, detalle } = producto;
    const query = format(
      "UPDATE productos SET partnumber = %L, nombre = %L, precio = %s, picture_url = %L, detalle = %L WHERE id = %L RETURNING *",
      partnumber,
      nombre,
      precio,
      picture_url,
      detalle,
      id
    );
    try {
      const result = await pool.query(query);
      if (result.rows.length === 0) {
        return null;
      }
      else {
        return result.rows[0];
      }
    } catch (err) {
      console.log(err);
      if (err.code === "3D000") {
        throw { code: 500, message: "Error interno del servidor" };
      }
      throw { code: 400, message: "Error al modificar producto" };
    }
  };

  
  
  module.exports = { 
    verificarCredenciales, 
    saveUser, 
    getUser,
    addProducto,
    getProductos,
    getProducto,
    modificarProducto,
    getMyOrders,
    createOrder,
    getOrderDetailsById,
    modificarStatusOrden,
    updateUserProfile
  };

