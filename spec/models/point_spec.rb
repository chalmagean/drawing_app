require 'rails_helper'

RSpec.describe Point, type: :model do
  it { should validate_presence_of(:x) }
  it { should validate_presence_of(:y) }
end
