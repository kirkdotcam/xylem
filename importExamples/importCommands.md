--file
--database
--collection

--jsonArray
--type=<json|csv|tsv>
--fields/--fieldFile
--columnsHaveTypes

```csv
name
age
height
```

--stopOnError
--writeConcern

--upsertFields
--mode=<insert|upsert|merge|delete>
note: upsert is a REPLACE here!!

--drop

https://www.mongodb.com/docs/database-tools/mongoimport/
https://www.mongodb.com/docs/database-tools/mongoimport/mongoimport-examples/#import-csv-with-specified-field-types

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
