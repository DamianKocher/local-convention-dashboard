CREATE TABLE members
(
    id         SERIAL PRIMARY KEY,
    email      TEXT NOT NULL UNIQUE,
    full_name  TEXT NOT NULL,
    short_name TEXT NOT NULL
);

CREATE TABLE verifications
(
    id           SERIAL PRIMARY KEY,
    member_id    INTEGER                             NOT NULL REFERENCES members (id),
    email        TEXT                                NOT NULL,
    code         TEXT                                NOT NULL,
    is_nullified BOOLEAN   DEFAULT FALSE,
    timestamp    TIMESTAMP default current_timestamp NOT NULL
);

CREATE TABLE documents
(
    id                  SERIAL PRIMARY KEY,
    name                TEXT                                             NOT NULL,
    description         TEXT                                             NOT NULL,
    type                TEXT CHECK (type IN ('resolution', 'amendment')) NOT NULL,
    co_authors          TEXT                                             NOT NULL,
    signatures_required INTEGER                                          NOT NULL DEFAULT 10,
    relates_to          INTEGER REFERENCES documents (id),
    markdown            TEXT                                             NOT NULL
);

CREATE TABLE signatures
(
    id          SERIAL PRIMARY KEY,
    member_id   integer                             NOT NULL REFERENCES members (id),
    document_id integer                             NOT NULL REFERENCES documents (id),
    timestamp   TIMESTAMP default current_timestamp NOT NULL,

    UNIQUE (member_id, document_id)
);

CREATE TABLE forms
(
    id        SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL REFERENCES members (id),
    type      TEXT    NOT NULL,
    link      TEXT    NOT NULL
);

CREATE TABLE questionnaires
(
    id         SERIAL PRIMARY KEY,
    name       TEXT  NOT NULL,
    pronouns   TEXT  NOT NULL,
    formation  TEXT  NOT NULL,
    start_date TEXT  NOT NULL,
    data       jsonb NOT NULL
);

ALTER TABLE questionnaires
    ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 1000;

ALTER TABLE documents
    ADD COLUMN frozen BOOLEAN DEFAULT FALSE NOT NULL;

ALTER TABLE documents
    ADD COLUMN hidden BOOLEAN DEFAULT FALSE NOT NULL;

CREATE INDEX idx_verifications_email ON verifications (email);
CREATE INDEX idx_signatures_member_id ON signatures (member_id);
CREATE INDEX idx_signatures_document_id ON signatures (document_id);
CREATE INDEX idx_document_related_to ON documents (relates_to);

SET TIME ZONE 'UTC';