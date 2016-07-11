Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :points, only: [:index, :create]
      resources :lines, only: [:index, :create]
    end
  end

  root 'site#index'
end
