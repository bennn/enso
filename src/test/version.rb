require 'rbconfig'

ruby_release = "#{RUBY_VERSION} (#{RUBY_RELEASE_DATE})"
puts ruby_release
puts ARGV
RUBY = File.join(RbConfig::CONFIG['bindir'], RbConfig::CONFIG['ruby_install_name']).
    sub(/.*\s.*/m, '"\&"')
puts RUBY