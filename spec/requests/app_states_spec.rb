require 'rails_helper'

RSpec.describe "AppStates", type: :request do
  describe "GET /app_states" do
    it "works! (now write some real specs)" do
      get root_path
      expect(response).to have_http_status(200)
    end
  end
end
