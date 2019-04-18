const APIUtil = require('./api_util.js')
class FollowToggle {
    constructor (el) {
        this.el = $(el);
        this.userId = this.el.data("user-id");
        this.followState = this.el.data("initial-follow-state");  
        this.render = this.render.bind(this);
        this.render();
        this.handleClick();
    }

    render(){
        if (this.followState === "following"){
            this.el.attr("disabled", true)
            this.el.text("Following...")
        } else if(this.followState === "unfollowing"){
            this.el.attr("disabled", true)
            this.el.text("Unfollowing...")
        }
        else if(this.followState==="unfollowed"){
            this.el.text("Follow!")
            this.el.attr('disabled', false);
        }else{
            this.el.text("Unfollow!")
            this.el.attr('disabled', false);
        }
    }

    handleClick(){
        this.el.on("click", e => {
            e.preventDefault();
            let that = this;
            if(this.followState === "unfollowed"){
                that.followState = "following";
                that.render()
                APIUtil.followUser(that.userId)
                .then(() => { that.followState = "followed" })
                .then(that.render);
            } else{
                that.followState = "unfollowing";
                that.render()
                APIUtil.unfollowUser(that.userId)
                .then(() => { that.followState = "unfollowed" })
                .then(that.render);
            }
        });
    }
}

module.exports = FollowToggle;