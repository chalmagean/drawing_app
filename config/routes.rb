Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :points, only: [:index]
      resources :lines, only: [:index]
    end
  end

  root 'site#index'
end
