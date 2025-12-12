# Import commands using `mongoimport`

Common required flags

- --file
- --database
- --collection

Useful flags for JSON Arrays and CSV/TSV files

- --jsonArray
- --type=<json|csv|tsv>
- --fields/--fieldFile
- --columnsHaveTypes

```csv
name
age
height
```

Useful flags for controlling import behaviors

- --stopOnError
- --writeConcern

- --upsertFields
- --mode=<insert|upsert|merge|delete>
- note: upsert is a REPLACE here!!

- --drop

Links to Documentation
https://www.mongodb.com/docs/database-tools/mongoimport/
https://www.mongodb.com/docs/database-tools/mongoimport/mongoimport-examples/#import-csv-with-specified-field-types

An example using a file called sample_mflix.comments.json (also in this folder)

```bash

mongoimport \
--uri=mongodb://localhost:27017 \
--file=sample_mflix.comments.json \
--jsonArray \
--db=test \
--collection=comments \
--stopOnError \
--drop

```
