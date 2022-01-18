const { djRole } = require("../config.json").guildInfo
module.exports = {
    get(commandIds){
        return [
            {
                "id": commandIds.remove,
                "permissions": [
                    {
                        "id" : djRole,
                        "type": 1,
                        "permission": true
                    }
                ]
            }
        ]
    }
};