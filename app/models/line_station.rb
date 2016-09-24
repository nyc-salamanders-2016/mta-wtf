class LineStation < ApplicationRecord
  belongs_to :line
  belongs_to :station

  validates :line, uniqueness: { scope: :station }
end
