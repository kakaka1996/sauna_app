module Hotpepper
  API_URL = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/'

  class Client

    def initialize(api_key)
      @api_key = api_key
    end

    def connection
      @connection ||= Faraday.new(url: API_URL) do |faraday|
        faraday.request :url_encoded
        faraday.headers['Accept'] = 'application/json'
        faraday.adapter Faraday.default_adapter
      end
    end

    def get(params = {})
      response = connection.get("", params.merge(key: @api_key))
      JSON.parse(response.body)
    end

    def search_restaurant(lat:, lng:, range: 4, count: 20)
      get( lat: lat, lng: lng, range: range, count: count, format: "json" )
    end
  end
end
