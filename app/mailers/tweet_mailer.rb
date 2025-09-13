class TweetMailer < ApplicationMailer
    def notify(tweet)
    @tweet = tweet
    @user = tweet.user
     mail(to: @tweet.user.email, subject: "Your Tweet has successfully been posted")
  end
end
