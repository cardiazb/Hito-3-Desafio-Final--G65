--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.0

-- Started on 2024-11-18 10:19:28 EST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS desafio_final;
--
-- TOC entry 3414 (class 1262 OID 49723)
-- Name: desafio_final; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE desafio_final WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE desafio_final OWNER TO postgres;

\connect desafio_final

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 228 (class 1255 OID 49858)
-- Name: create_cliente_tipo_after_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_cliente_tipo_after_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT into perfil (usuario_id, tipo)
	VALUES (NEW.id, 'Cliente');
	RETURN NEW;
END;
$$;


ALTER FUNCTION public.create_cliente_tipo_after_insert() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 49783)
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id bigint NOT NULL,
    usuario_id bigint,
    nombre character varying(50),
    apellido character varying(50),
    direccion text,
    telefono character varying(20)
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 49782)
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clientes_id_seq OWNER TO postgres;

--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 224
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- TOC entry 223 (class 1259 OID 49771)
-- Name: detalle_pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_pedido (
    id bigint NOT NULL,
    pedido_id bigint,
    producto_id bigint,
    cantidad integer
);


ALTER TABLE public.detalle_pedido OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 49770)
-- Name: detalle_pedido_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_pedido_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_pedido_id_seq OWNER TO postgres;

--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 222
-- Name: detalle_pedido_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_pedido_id_seq OWNED BY public.detalle_pedido.id;


--
-- TOC entry 221 (class 1259 OID 49757)
-- Name: ingredientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredientes (
    id bigint NOT NULL,
    producto_id bigint,
    nombre text
);


ALTER TABLE public.ingredientes OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 49756)
-- Name: ingredientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredientes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ingredientes_id_seq OWNER TO postgres;

--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 220
-- Name: ingredientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredientes_id_seq OWNED BY public.ingredientes.id;


--
-- TOC entry 227 (class 1259 OID 49804)
-- Name: pedidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedidos (
    id bigint NOT NULL,
    usuario_id bigint,
    total integer,
    tipo_pago character varying(50),
    fecha_hora timestamp with time zone DEFAULT now(),
    delivery boolean,
    status character varying(20) DEFAULT 'Creado'::character varying
);


ALTER TABLE public.pedidos OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 49803)
-- Name: pedidos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedidos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedidos_id_seq OWNER TO postgres;

--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 226
-- Name: pedidos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;


--
-- TOC entry 217 (class 1259 OID 49737)
-- Name: perfil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfil (
    usuario_id bigint,
    tipo character varying
);


ALTER TABLE public.perfil OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 49748)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id bigint NOT NULL,
    partnumber character varying(50),
    nombre character varying(100),
    precio integer,
    picture_url text,
    detalle text
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 49747)
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_id_seq OWNER TO postgres;

--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 218
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- TOC entry 216 (class 1259 OID 49725)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id bigint NOT NULL,
    email character varying(50),
    password character varying(200)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 49724)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 215
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 3237 (class 2604 OID 49786)
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- TOC entry 3236 (class 2604 OID 49774)
-- Name: detalle_pedido id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido ALTER COLUMN id SET DEFAULT nextval('public.detalle_pedido_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 49760)
-- Name: ingredientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes ALTER COLUMN id SET DEFAULT nextval('public.ingredientes_id_seq'::regclass);


--
-- TOC entry 3238 (class 2604 OID 49807)
-- Name: pedidos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 49751)
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 49728)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 3254 (class 2606 OID 49790)
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- TOC entry 3256 (class 2606 OID 49811)
-- Name: clientes clientes_usuario_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_usuario_id_key UNIQUE (usuario_id);


--
-- TOC entry 3252 (class 2606 OID 49776)
-- Name: detalle_pedido detalle_pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT detalle_pedido_pkey PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 49764)
-- Name: ingredientes ingredientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes
    ADD CONSTRAINT ingredientes_pkey PRIMARY KEY (id);


--
-- TOC entry 3258 (class 2606 OID 49809)
-- Name: pedidos pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);


--
-- TOC entry 3246 (class 2606 OID 49883)
-- Name: productos productos_partnumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_partnumber_key UNIQUE (partnumber);


--
-- TOC entry 3248 (class 2606 OID 49755)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2606 OID 49732)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 3244 (class 2606 OID 49730)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 3265 (class 2620 OID 49859)
-- Name: usuarios insert_tipo_usuario_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER insert_tipo_usuario_trigger AFTER INSERT ON public.usuarios FOR EACH ROW EXECUTE FUNCTION public.create_cliente_tipo_after_insert();


--
-- TOC entry 3263 (class 2606 OID 49852)
-- Name: clientes clientes_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3261 (class 2606 OID 49817)
-- Name: detalle_pedido detalle_pedido_pedido_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT detalle_pedido_pedido_id_fkey FOREIGN KEY (pedido_id) REFERENCES public.pedidos(id) NOT VALID;


--
-- TOC entry 3262 (class 2606 OID 49777)
-- Name: detalle_pedido detalle_pedido_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT detalle_pedido_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id);


--
-- TOC entry 3260 (class 2606 OID 49765)
-- Name: ingredientes ingredientes_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes
    ADD CONSTRAINT ingredientes_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id);


--
-- TOC entry 3264 (class 2606 OID 49812)
-- Name: pedidos pedidos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.clientes(usuario_id) NOT VALID;


--
-- TOC entry 3259 (class 2606 OID 49742)
-- Name: perfil perfil_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT perfil_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


-- Completed on 2024-11-18 10:19:29 EST

--
-- PostgreSQL database dump complete
--

