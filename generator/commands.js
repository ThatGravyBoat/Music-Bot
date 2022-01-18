module.exports = [
    {
        "name": "play",
        "description": "Adds the song to the queue to play.",
        "options": [
            {
                "type": 3,
                "name": "song",
                "description": "The song which you would like to play.",
                "required": true
            },
            {
                "type": 5,
                "name": "force",
                "description": "This is a DJ only option so don't use it if you're not a DJ of the guild.",
                "required": false
            }
        ]
    },
    {
        "name": "remove",
        "default_permissions": false,
        "description": "Removes a song thats a specific index in the queue.",
        "options": [
            {
                "type": 4,
                "name": "index",
                "description": "The index of the song",
                "required": true
            }
        ]
    }
];