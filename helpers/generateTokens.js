const AdwordsAuth = require('node-adwords').AdwordsAuth;
const AdwordsUser = require('node-adwords').AdwordsUser;
const AdwordsConstants = require('node-adwords').AdwordsConstants;
const parseString = require('xml2js').parseString;

let auth = new AdwordsAuth({
    client_id: '288893135670-2a6ql6rfvnii0kd52b52rri12tmgl7sg.apps.googleusercontent.com', //this is the api console client_id
    client_secret: 'eNOeeRGqhGTPbXZigX4Cnvat'
}, 'http://localhost:3000/adwords/auth');

//assuming express
app.get('/adwords/go', (req, res) => {
    res.redirect(auth.generateAuthenticationUrl());
})

app.get('/adwords/auth', (req, res) => {
    auth.getAccessTokenFromAuthorizationCode(req.query.code, (error, tokens) => {
        console.log('error', error);
        console.log('tokens', tokens);
    })
});


/*
tokens { access_token: 'ya29.GlvfBX13-9HGtZAp0qdejLaSAbj7bjGjRzRMTqTaCZvWp_KudMhXrKYCED22-rx4AHYbFabjk9FzJWSGdHFvx5F7mPaTO4laOxd_RIQVa8L0YhNAyT_tbT6dI0F2',
  refresh_token: '1/pprqYy8zeZMObu7IDWRJx8RCq7Z7pTaTYK9-VTiEhmg',
  token_type: 'Bearer',
  expiry_date: 1529380944100 }
*/