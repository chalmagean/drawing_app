require 'rails_helper'

RSpec.describe 'Lines', type: :request do
  describe 'GET /' do
    it 'loads the lines' do
      line = Line.create(nodes: [
        [[1, 1], [2, 2], [3, 3]],
        [[4, 4], [5, 5]]
      ])
      serialized_line = LineSerializer.new(line)
      serialization = ActiveModelSerializers::Adapter.create(serialized_line)

      get api_v1_lines_path, format: :json
      expect(response.body).to include(serialization.to_json)
    end
  end

  describe 'POST /' do
    it 'stores the line' do
      params = { line: { nodes: { "0": [1, 1], "1": [2, 2] } } }

      expect do
        post api_v1_lines_path, params, format: :json
      end.to change(Line, :count).by(1)

      last_line = Line.last
      expect(last_line.nodes).to eq([["1", "1"], ["2", "2"]])
    end

    context 'when params are off' do
      it 'resonds with :bad_requests' do
        params = { line: { foo: 'bar' } }

        expect do
          post api_v1_lines_path, params, format: :json
        end.to_not change(Line, :count)

        expect(response.body).to eq('')
        expect(response.status).to eq(400)
      end
    end
  end
end
