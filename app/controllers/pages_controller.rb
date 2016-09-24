class PagesController < ApplicationController
  def index
  end

  def latest
    xml = Net::HTTP.get(URI('http://web.mta.info/status/serviceStatus.txt'))
    hash = Hash.from_xml(xml)
    html = Nokogiri::HTML(hash['service']['subway']['line'][0]['text'])
    cancelations = html.css('b').map(&:inner_text).select {|string| string.match(/\[(.)\] No trains/) }
    parsed_info = cancelations.map {|text| text.match(/\[(.)\] No trains (.*)/) }
    result = []
    parsed_info.each do |match|
      hash = {}
      hash[:line] = match[1]
      case match[2]
      when /running/
        hash[:canceled] = true
      else
        hash[:canceled] = match[2].match(/between (.*) and (.*)/)[1,2]
      end
      result << hash
    end
    render json: result
  end
end
