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

--
-- Data for Name: fonctions; Type: TABLE DATA; Schema: public; Owner: reignier
--

INSERT INTO utilisateurs (username, nom, prenom, numero, localisation) VALUES ('JoelMP', 'Martin-Prevel', 'Joel', '0682071261', ST_GeomFromText('POINT(0 0)', 26910) );

--COPY Utilisateurs (username, nom, prenom, numero, localisation) FROM stdin;
--JoelMP 	Martin-prevel	Joel	0682071261	
--Quadratic	x*x+y*y	-1	-1	1	1	f	2
--Chapeau	Math.sin(x*x+y*y)/(x*x+y*y)	-3	-3	3	3	t	3
--Montagnes	(x*x+3*y*y)*Math.exp(-x*x-y*y)	-2	-2	2	2	f	0
--\.


--
-- Name: fonctions fonctions_pk; Type: CONSTRAINT; Schema: public; Owner: reignier
--

ALTER TABLE ONLY Utilisateurs
    ADD CONSTRAINT utilisateurs_pk PRIMARY KEY (numero);

--
-- PostgreSQL database dump complete
--

