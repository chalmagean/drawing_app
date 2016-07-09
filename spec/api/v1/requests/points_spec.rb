require 'rails_helper'

RSpec.describe 'Points', type: :request do
  describe 'GET /' do
    it 'loads the points' do
      point = Point.create(x: 1, y: 1)
      serialized_point = PointSerializer.new(point)
      serialization = ActiveModel::Serializer::Adapter.create(serialized_point)

      get api_v1_points_path, format: :json
      expect(response.body).to include(serialization.to_json)
    end
  end

  describe 'POST /' do
    it 'stores the line'
  end
end
