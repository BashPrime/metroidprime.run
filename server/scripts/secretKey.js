require('crypto').randomBytes(32, function(err, buffer) {
  var token = buffer.toString('hex');
  console.log(token);
});
