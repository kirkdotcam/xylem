# xylem

This project is meant to be a low-complexity set of examples for implementing methods for MongoDB language drivers. 

## chStreamFlood

An example of Node.js spawning several processes, then each process loading data as fast as it can into the database in writer.js. We then read from the database using a change stream in reader.js.

## findOneAndUpdate

A compare/contrast set of code of using reads with updates, as opposed to a findOneAndUpdate method call.

## gridFSNode

An example of an implementation of gridFS to load basil images into the database as objects and creating chunks collections.
