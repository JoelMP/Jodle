--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

--CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


CREATE EXTENSION IF NOT EXISTS postgis;

--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

--COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: fonctions; Type: TABLE; Schema: public; Owner: reignier
--

CREATE TABLE utilisateurs (
    username character varying(100) NOT NULL,
    nom character varying(100) NOT NULL,
    prenom character varying(100) NOT NULL,
    numero varchar(10) NOT NULL,
    localisation GEOMETRY(Point, 26910)
);


ALTER TABLE utilisateurs OWNER TO martinpj;

ALTER TABLE ONLY Utilisateurs
    ADD CONSTRAINT utilisateurs_pk PRIMARY KEY (numero);




CREATE TABLE connexions (
    numero varchar(10) NOT NULL,
    socket varchar(40) NOT NULL,
    PRIMARY KEY (numero),
    FOREIGN KEY (numero) REFERENCES utilisateurs(numero)
);


CREATE TABLE messages (
    numero varchar(10),
    message varchar(500),
    heure time,
    -- localisation GEOMETRY(Point, 26910),
    FOREIGN KEY (numero) REFERENCES utilisateurs(numero)
)




--
-- PostgreSQL database dump complete
--

