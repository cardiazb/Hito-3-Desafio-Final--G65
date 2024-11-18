const request = require('supertest');
const server = require('../index');
const { TokenPrueba } = require('../Config/secretKey');


describe("Operaciones Login", () => {
    it("Verificar que la ruta POST /api/login devuelva un token válido al enviar los datos correctos", async () => {
        const response = await request(server).post("/api/login").send({
            email: "carlosdiazbecar2@gmail.com",
            password: "carlosdiaz2"
        });
        expect(response.status).toBe(201);
        expect(response.body.token).toBeTruthy();
    });
});

describe("Operaciones de Pedidos", () => {
    it("Verificando que para los pedidos debo iniciar sesión", async () => {
        const response = await request(server).get("/api/pedidos").send();
        expect(response.status).toBe(401);
    });
    it("Verificando que para ver mis pedidos tengo que enviar un token válido", async () => {
        const {body} = await request(server).get("/api/pedidos").set('Authorization', TokenPrueba).send();
        const pedidos = body;
        expect(pedidos).toBeInstanceOf(Array);
        expect(pedidos.length).toBeGreaterThan(0);
    });
});

describe("Operaciones Productos", () => {
    /*
    1.- Testea que la ruta GET /api/productos devuelve un status code 200 y el tipo de dato recibido
    es un arreglo con por lo menos 1 objeto
    */
    it("Verificando que la ruta GET /api/productos devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const {body} = await request(server).get("/api/productos").send();
        const productos = body;
        expect(productos).toBeInstanceOf(Array);
        expect(productos.length).toBeGreaterThan(0);
    });

    /*
    2.- Testea que la ruta POST /api/productos devuelve un status code 201 y el tipo de dato recibido
    es un objeto con la siguiente estructura:
    {
        "partnumber": "123456",
        "nombre": "Producto 1",
        "precio": 10,
        "detalle": "Este es el detalle del producto",
        "imagen": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
    }
        */
        it("Verificar que la ruta POST /api/admin/crearProducto devuelve un status code 409 al intentar crear un producto que ya existe", async () => {
            const response = await request(server).post("/api/admin/crearProducto").set('Authorization', TokenPrueba).send({
                partnumber: "1234567",
                nombre: "Producto 1",
                precio: 10,
                detalle: "Este es el detalle del producto",
                picture_url: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            });
            console.log(response.body);
            expect(response.status).toBe(409);
        }); 


});
