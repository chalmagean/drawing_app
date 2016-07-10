class Line < ActiveRecord::Base
  serialize :nodes

  validates :nodes, presence: true
end
