const FollowToggle = require('./follow_toggle.js');

    $(() => {
        $('.follow-toggle').each((idx, el) => {
            let current = new FollowToggle(el)  
        })
    })