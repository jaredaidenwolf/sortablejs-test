class Task < ApplicationRecord
  acts_as_list top_of_list: 0
end
