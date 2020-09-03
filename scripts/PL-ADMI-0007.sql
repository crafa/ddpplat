CREATE TABLE public.lista
(
    id serial,
    descripcion character varying,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);


CREATE TABLE public.listadetalle
(
    id serial,
    idlista integer,
    valortexto character varying,
    orden integer,
    estaactivo boolean,
    PRIMARY KEY (id),
    CONSTRAINT fk_idlista FOREIGN KEY (idlista)
        REFERENCES lista(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
);

/*Para insertar elemementos*/
WITH inserted AS (
  INSERT INTO lista(descripcion) VALUES ('Género')
  RETURNING id
) INSERT INTO listadetalle(valortexto, idlista, estaactivo, orden) VALUES
  ('Masculino', (SELECT inserted.id FROM inserted), '1', 2),
  ('Femenino', (SELECT inserted.id FROM inserted), '1', 1);

WITH inserted AS (
  INSERT INTO lista(descripcion) VALUES ('Tipo de Documento')
  RETURNING id
) INSERT INTO listadetalle(valortexto, idlista, estaactivo, orden) VALUES
  ('LIBRETA ELECTORAL O DNI', (SELECT inserted.id FROM inserted), '1', 1),
  ('CARNET DE EXTRANJERIA', (SELECT inserted.id FROM inserted), '1', 2),
  ('RUC', (SELECT inserted.id FROM inserted), '1', 3),
  ('PASAPORTE', (SELECT inserted.id FROM inserted), '1', 4),
  ('OTROS', (SELECT inserted.id FROM inserted), '1', 5);