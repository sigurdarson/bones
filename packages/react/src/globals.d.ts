/* Bundlers statically replace process.env.NODE_ENV in browser builds; this
   keeps the library free of a full Node types dependency. */
declare const process: {
  env: {
    NODE_ENV?: string;
  };
};
