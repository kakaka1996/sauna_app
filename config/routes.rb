Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    omniauth_callbacks: "users/omniauth_callbacks",
    passwords: "users/passwords"
  }

  # 開発環境でメール内容をブラウザで確認するためのルート
  if Rails.env.development? && defined?(LetterOpenerWeb)
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root "top#explain"
  get "top", to: "top#top"
  get "/terms_of_service", to: "top#terms_of_service"
  get "/privacy_policy", to: "top#privacy_policy"
  get "/inquiry_form", to: "top#inquiry_form"
  get "/explain", to: "top#explain"
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  resources :sauna_logs, only: %i[index new create edit show update destroy] do
    collection do
      get :feed
      get :liked
    end
  end
  resources :likes, only: %i[create destroy]
  resources :favorite_facilities, only: %i[index create destroy]

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
