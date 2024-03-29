const fs = require('fs');

const userEndpoint = '/s2s-schema';
const productEndpoint = '/s3s-schema';

exports.userSchema = app.get(schemaEndpoint, (req, res) => {
  const file = fs.readFileSync('./s2sLfuser.graphql');
  res.type('application/txt');
  res.charset = 'UTF-8';
  res.write(file);
  res.end();
});




exports.productSchema = app.get(schemaEndpoint, (req, res) => {
  const file = fs.readFileSync('./s2sLfproduct.graphql');
  res.type('application/txt');
  res.charset = 'UTF-8';
  res.write(file);
  res.end();
});

