--file
--database
--collection

--jsonArray
--type=<json|csv|tsv>
--fields/--fieldFile
--columnsHaveTypes
--parseGrace

```csv
name.string()
age.int32()
height.double()
```

--stopOnError
--writeConcern
--numInsertionWorkers

--mode=<insert|upsert|merge|delete>
note: upsert is a REPLACE here!!
--upsertFields

--drop

https://www.mongodb.com/docs/database-tools/mongoimport/
https://www.mongodb.com/docs/database-tools/mongoimport/mongoimport-examples/#import-csv-with-specified-field-types
https://www.mongodb.com/try/download/database-tools

```bash

mongoimport \
--uri=mongodb://localhost:27017 \
--file=sample_mflix.comments.json \
--jsonArray \
--db=test \
--collection=comments \
--stopOnError \
--drop \
--mode=insert

```
