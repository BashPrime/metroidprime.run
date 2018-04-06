CREATE TABLE records_variables (
    recordid INTEGER NOT NULL REFERENCES records(id),
    variableid INTEGER NOT NULL REFERENCES variables(id),
    valueid INTEGER NOT NULL REFERENCES variables_values(id),
    PRIMARY KEY(recordid, variableid)
);