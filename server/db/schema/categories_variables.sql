CREATE TABLE categories_variables (
    categoryid INTEGER NOT NULL REFERENCES categories(id),
    variableid INTEGER NOT NULL REFERENCES variables(id),
    valueid INTEGER NOT NULL REFERENCES variables_values(id),
    PRIMARY KEY(categoryid, variableid, valueid)
);