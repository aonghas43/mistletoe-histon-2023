use strict;

var readJson = (path, cb) => {
  fs.readFile(require.resolve(path), (err, data) => {
    if (err) cb(err);
    else cb(null, JSON.parse(data));
  });
};

readJson("./trees.json", (err, trees) => {
}

// acknowledge: https://stackoverflow.com/questions/14484613/load-local-json-file-into-variable