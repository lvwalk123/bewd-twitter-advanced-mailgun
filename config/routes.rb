Rails.application.routes.draw do
  # ROOT ROUTE
  root to: "homepage#index"

  # FEEDS
  get '/feeds' => 'feeds#index'

  # USERS
  post '/users' => 'users#create'

  # SESSIONS
  post '/sessions' => 'sessions#create'
  get  '/authenticated' => 'sessions#authenticated'
  delete '/sessions' => 'sessions#destroy'

  # TWEETS
  post '/tweets' => 'tweets#create'
  get  '/tweets' => 'tweets#index'
  delete '/tweets/:id' => 'tweets#destroy'
  get '/users/:username/tweets' => 'tweets#index_by_user'

  # OPTIONAL: Redirect all unknown routes to the home page (for frontend routing)
  # get '*path' => 'home#index', via: :all
end
