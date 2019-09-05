const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))

const AdwordsAuth = require('node-adwords').AdwordsAuth;
const AdwordsUser = require('node-adwords').AdwordsUser;
const AdwordsConstants = require('node-adwords').AdwordsConstants;
const parseString = require('xml2js').parseString;
const async = require('async');

let budgetHelper = require('./helpers/budgetHelper');
let campaignHelper = require('./helpers/campaignHelper');
let adGroupHelper = require('./helpers/adGroupHelper');
let proximityHelper = require('./helpers/proximityHelper');

async.waterfall([
    getUser,
    getBudget,
    getCampaign,
    getAdGroups,
    getKeywords
], function(err, result) {
    console.log('err index', err);
    console.log('result  at end', result);
});

function getUser(callback) {
    let user = new AdwordsUser({
        developerToken: '', //your adwords developerToken
        userAgent: 'Erik', //any company name
        clientCustomerId: '', //the Adwords Account id (e.g. 123-123-123)
        client_id: '', //this is the api console client_id
        client_secret: '',
        refresh_token: '',
    });
    console.log('user', user);
    callback(null, user);
}

function getBudget(user, callback) {
    let budget = budgetHelper.newBudget(user, function(error, budget) {
        console.log('budget', budget);
        callback(null, user, budget);
    });
}

function getCampaign(user, budget, callback) {
    console.log('budgethere', budget);
    let campaign = campaignHelper.newCampaign(user, budget, function(error, campaign) {
        if (error) {
            return callback(error);
        }
        console.log('campaign', campaign);
        callback(null, user, campaign);
    });
};

function getAdGroups(user, campaign, callback) {
    let adGroup = adGroupHelper.newAdGroup(user, function(error, adGroup) {
        console.log('adGroup', adGroup);
        callback(null, user, adGroup);
    });
}

function getKeywords(user, adGroup, callback) {
    let keywords = keywordsHelper.newKeyword(user, adGroup, function(error, keywords) {
        console.log('keywords', keywords);
        callback(null, user, keywords);
    });
}

function setProximityTarget(user, campaign, callback) {
    console.log('campaign.value[0].id', campaign.value[0].id);
    let proximity = proximityHelper.setCampaignCriterion(user, campaign.value[0].id, function(error, proximity) {
        callback(null, proximity);
    });
}