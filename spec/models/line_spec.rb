require 'rails_helper'

RSpec.describe Line, type: :model do
  it { should validate_presence_of(:nodes) }

  it 'serializes the nodes attribute' do
    line = Line.create(nodes: [[1, 1]])
    expect(line.nodes).to be_a(Array)
  end
end
