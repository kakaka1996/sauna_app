class RestaurantsController < ApplicationController
  def index
    lat = params[:lat] .to_f
    lng = params[:lng] .to_f

    restaurants = Rails.cache.fetch([ "hotpepper_nearby", lat.round(5), lng.round(5) ], expires_in: 24.hour) do
      client = Hotpepper::Client.new(ENV["HOTPEPPER_API_KEY"])
      response = client.search_restaurant(lat: lat, lng: lng)
      shops = response.dig("results", "shop") || []
      shops.map do |shop|
        {
          name: shop["name"],
          lat: shop["lat"],
          lng: shop["lng"],
          address: shop["address"],
          genre: shop["genre"]["name"],
          photo_url: shop["photo"]["mobile"]["l"],
          url: shop["urls"]["pc"]
        }
      end
    end

    render json: restaurants
  rescue Faraday::Error, JSON::ParserError => e
    render json: { error: e.message }, status: :bad_gateway
  end
end
