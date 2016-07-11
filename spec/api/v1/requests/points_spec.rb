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
    it 'stores the point' do
      params = { point: { x: 1, y: 2 } }

      expect do
        post api_v1_points_path, params, format: :json
      end.to change(Point, :count).by(1)

      last_point = Point.last
      expect(last_point.x).to eq(1)
      expect(last_point.y).to eq(2)
    end

    context 'when params are off' do
      it 'resonds with :bad_requests' do
        params = { point: { z: 1 } }

        expect do
          post api_v1_points_path, params, format: :json
        end.to_not change(Point, :count)

        expect(response.body).to eq('')
        expect(response.status).to eq(400)
      end
    end
  end
end
