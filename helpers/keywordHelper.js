var adgroupCriterionService;

function init(user) {
    if (!adgroupCriterionService) {
        adgroupCriterionService = user.getService('AdGroupCriterionService', 'v201806'); 
        keywordService = user.getService('keywordService', 'v201806');
    }
}

module.exports.newKeyword = function(user, campaign, callback) {
    init(user);
    let keywordObj = getNewkeywordObj(campaign);
    let keywordOperation = getNewkeywordOperation('ADD', keywordObj);
    let keyword = getNewkeyword([keywordOperation], function(error, result) {
        callback(null, result);
    });
}

function getNewkeywordOperation(operator, operand) {
    return {
        operator: operator,
        operand: operand
    }
}

function getNewkeywordObj(campaign) {
    return {
        'xsi:type': 'BiddableAdGroupCriterion',
        adGroupId: adgroup.id,
        criterion: {
            'xsi:type': 'Keyword',
            text: 'NodeAdwordsTestKeyword ' + Date.now(),
            matchType: 'EXACT'
        },
        userStatus: 'PAUSED',
        finalUrls: {
            urls: ['http://www.example.com/mars']
        }
    }
}

function getNewkeyword(keywordOperations) {
    keywordService.mutate({operations: keywordOperations}, (error, keyword) => {
        if (error) {
            return error;
        }
        return keyword;
    });
}

function deletekeyword(keyword) {
    let keywordDeleteOperation = {
        operator: 'SET',
        operand: {
            id: keyword.value[0].id,
            status: 'REMOVED'
        }
    };
    keywordService.mutate({operations: [keywordDeleteOperation]}, done);
}