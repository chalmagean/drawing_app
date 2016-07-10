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
    it 'stores the line'
  end
end
