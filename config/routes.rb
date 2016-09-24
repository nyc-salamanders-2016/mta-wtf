Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'pages#index'
  get '/latest', to: 'pages#latest'
  get '/stations', to: 'pages#all_stations'
end
