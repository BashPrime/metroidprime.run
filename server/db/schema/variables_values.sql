CREATE TABLE variables_values (
    id INTEGER PRIMARY KEY,
    variableid INTEGER NOT NULL REFERENCES variables(id),
    label TEXT NOT NULL
);