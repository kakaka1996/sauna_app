Rails.application.configure do
  config.content_security_policy do |policy|
    policy.default_src :self
    policy.img_src     :self, :https, :data
    policy.script_src  :self, "https://maps.googleapis.com"
    # 違反レポートの送信先URIを指定する
    # policy.report_uri "/csp-violation-report-endpoint"
  end

  config.content_security_policy_nonce_generator = ->(request) { request.session.id.to_s }
  config.content_security_policy_nonce_directives = %w[script-src style-src]

  config.content_security_policy_report_only = true
end
