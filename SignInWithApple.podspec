require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "SignInWithApple"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.platform     = :ios, "13.0"

  # s.source       = { :git => "https://github.com/Andreyco/sign-in-with-apple.git", :tag => "#{s.version}" }
  s.source       = { :git => "https://github.com/Andreyco/sign-in-with-apple.git", :branch => "publishable-package" }
  s.source_files  = "ios/**/*.{h,m,swift}"
  s.swift_version = '5.0'

  s.dependency 'React'

end