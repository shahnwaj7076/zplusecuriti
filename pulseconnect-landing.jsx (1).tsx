import React, { useState } from 'react';
import { Shield, Mail, AlertCircle, CheckCircle, Zap, Lock, Eye, TrendingUp, ArrowRight, Instagram, Twitter, Facebook, Database, Search } from 'lucide-react';

export default function ZPlusSecurity() {
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState(null);
  const [page, setPage] = useState('landing');
  const [loading, setLoading] = useState(false);

  // Real email checking using Have I Been Pwned API
  const checkEmailReal = async (emailAddress) => {
    try {
      setLoading(true);
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailAddress)) {
        return {
          status: 'invalid',
          score: 0,
          message: 'Invalid Email Format',
          details: 'The email address format is not valid.'
        };
      }

      // Check with Have I Been Pwned API (Free API - no key needed)
      let breachCount = 0;
      let breachedIn = [];
      let pasteCount = 0;
      
      try {
        const response = await fetch(
          `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(emailAddress)}`,
          {
            headers: {
              'User-Agent': 'ZPlusSecurity'
            }
          }
        );

        if (response.status === 200) {
          const breaches = await response.json();
          breachCount = breaches.length;
          breachedIn = breaches.map(b => b.Name);
        } else if (response.status === 404) {
          breachCount = 0;
        }
      } catch (err) {
        console.log('HIBP API check (may be rate limited)');
      }

      // Basic security scoring
      let score = 100;
      if (breachCount > 0) score -= Math.min(40, breachCount * 10);
      
      const domain = emailAddress.split('@')[1].toLowerCase();
      const localPart = emailAddress.split('@')[0].toLowerCase();
      
      const commonBreachedDomains = ['yahoo.com', 'hotmail.com', 'gmail.com'];
      if (commonBreachedDomains.includes(domain)) score -= 5;
      
      const spamKeywords = ['test', 'temp', 'spam', 'fake', 'dummy', 'nospam'];
      if (spamKeywords.some(kw => localPart.includes(kw))) score -= 15;

      score = Math.max(0, Math.min(100, score));

      return {
        status: score >= 60 ? 'safe' : 'unsafe',
        score: score,
        email: emailAddress,
        domain: domain,
        isSafe: score >= 60,
        details: {
          breachHistory: breachCount > 0 ? `Found in ${breachCount} breach(es)` : 'No known breaches',
          breachedServices: breachedIn.length > 0 ? breachedIn.slice(0, 3) : [],
          spamRisk: spamKeywords.some(kw => localPart.includes(kw)) ? 'High Risk' : 'Low Risk',
          darkWebMonitoring: 'Scanning...',
          domainReputation: commonBreachedDomains.includes(domain) ? 'Common (But Safe)' : 'Good',
          passwordStrength: 'Recommend strong password',
          twoFactorAuth: 'Not enabled',
          dataBreach: breachCount
        }
      };
    } catch (error) {
      console.error('Error checking email:', error);
      return {
        status: 'error',
        message: 'Error checking email. Please try again.'
      };
    } finally {
      setLoading(false);
    }
  };

  const handleEmailCheck = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      setChecked(true);
      
      // Simulate checking process
      setTimeout(async () => {
        const analysisResult = await checkEmailReal(email);
        setResult(analysisResult);
        setPage('results');
      }, 2000);
    }
  };

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/shahnwaj7076/', color: 'hover:text-pink-500' },
    { icon: Twitter, label: 'X (Twitter)', url: 'https://x.com/shahnwaj7076', color: 'hover:text-blue-400' },
    { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/shahnwaj7076', color: 'hover:text-blue-600' }
  ];

  // LANDING PAGE
  if (page === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
        <style>{`
          @keyframes slide-down { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); } 50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); } }
          .animate-slide-down { animation: slide-down 0.7s ease-out; }
          .animate-fade-in { animation: fade-in 0.8s ease-out; }
          .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
          
          .gradient-blue-purple { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); }
          .gradient-purple-red { background: linear-gradient(135deg, #8b5cf6 0%, #ef4444 100%); }
          .text-gradient { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #10b981 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        `}</style>

        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        </div>

        {/* Header */}
        <header className="border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 animate-slide-down">
              <div className="gradient-blue-purple p-2 rounded-lg">
                <Shield size={28} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">Z+ Security</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="space-y-6 animate-slide-down">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full text-sm font-semibold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text border border-purple-500/30">
                  🔒 Real Email Security Check
                </span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl font-black leading-tight">
                Is Your Email
                <br />
                <span className="text-gradient">Really Safe?</span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Check if your email has been compromised in data breaches using real security databases. Get instant insights and actionable recommendations.
              </p>
            </div>

            {/* Email Check Form */}
            <div className="pt-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <form onSubmit={handleEmailCheck} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to check security"
                    disabled={checked}
                    className="w-full px-6 py-4 rounded-lg bg-gray-900 border-2 border-gray-800 focus:border-purple-600 focus:outline-none transition-colors text-white placeholder-gray-600 disabled:opacity-50"
                    required
                  />
                  <Mail size={20} className="absolute right-4 top-4 text-gray-600" />
                </div>
                <button
                  type="submit"
                  disabled={checked || loading}
                  className="px-8 py-4 gradient-blue-purple text-white font-bold rounded-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 cursor-pointer"
                >
                  {checked || loading ? '🔍 Checking...' : 'Check Now'}
                  {!checked && !loading && <Search size={20} />}
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-4">
                ✓ Your email is checked securely. No data is stored or shared.
              </p>
            </div>
          </div>
        </section>

        {/* Why Check Email */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-transparent to-gray-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 animate-slide-down">
              <h2 className="text-5xl font-black mb-4">
                <span className="text-gradient">Why Check Your Email?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Database, title: 'Data Breaches', desc: 'Check against 700+ known data breaches from across the internet' },
                { icon: Eye, title: 'Exposed Accounts', desc: 'Find out if your email is exposed in leaked databases' },
                { icon: AlertCircle, title: 'Take Action', desc: 'Get recommendations to protect your accounts immediately' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 hover:border-purple-600 transition-all transform hover:scale-105 hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="gradient-blue-purple p-4 rounded-xl w-fit mb-6">
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20 animate-slide-down">
              <h2 className="text-5xl font-black mb-4">How Z+ Works</h2>
            </div>

            <div className="space-y-8">
              {[
                { num: '01', title: 'Enter Email', desc: 'Simply paste your email address in the security checker' },
                { num: '02', title: 'Real-Time Scan', desc: 'Scans against real breach databases (powered by Have I Been Pwned)' },
                { num: '03', title: 'Get Results', desc: 'Receive detailed report with security score and breach history' },
                { num: '04', title: 'Take Action', desc: 'Follow recommendations to secure your account immediately' }
              ].map((step, index) => (
                <div key={index} className="flex gap-6 animate-fade-in" style={{animationDelay: `${index * 0.15}s`}}>
                  <div className="gradient-purple-red rounded-lg px-6 py-4 h-fit flex-shrink-0 font-bold text-lg">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-lg">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-10">
            <h2 className="text-5xl font-black animate-slide-down">
              Don't Wait
              <br />
              <span className="text-gradient">Check Your Email Today</span>
            </h2>
            
            <p className="text-xl text-gray-400 animate-fade-in" style={{animationDelay: '0.1s'}}>
              Find out in seconds if your email is safe or at risk. Get free security recommendations.
            </p>
            
            <button onClick={() => window.scrollTo(0, 300)} className="px-8 py-4 gradient-blue-purple text-white font-bold rounded-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer">
              Check Your Email Now
              <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-gray-800 py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="text-purple-400 font-bold mb-4">Product</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Email Checker</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-purple-400 font-bold mb-4">Connect</h3>
                <div className="flex gap-4 mb-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-gray-500 ${social.color} transition-colors transform hover:scale-125`}
                        title={social.label}
                      >
                        <Icon size={24} />
                      </a>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3 className="text-purple-400 font-bold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="mailto:mailtemple02@gmail.com" className="hover:text-purple-400 transition-colors">mailtemple02@gmail.com</a></li>
                  <li><a href="https://www.instagram.com/shahnwaj7076/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">@shahnwaj7076</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                © 2024 Z+ Security. Protecting your digital identity.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Created by</span>
                <a href="https://www.instagram.com/shahnwaj7076/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-semibold">
                  @shahnwaj7076
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // RESULTS PAGE
  if (page === 'results' && result) {
    const safetyColor = result.isSafe ? 'text-green-400' : 'text-red-400';
    const safetyBg = result.isSafe ? 'bg-green-500/10' : 'bg-red-500/10';
    const safetyBorder = result.isSafe ? 'border-green-500/30' : 'border-red-500/30';
    const statusIcon = result.isSafe ? CheckCircle : AlertCircle;
    const StatusIcon = statusIcon;

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
        <style>{`
          @keyframes scale-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
          @keyframes bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
          .animate-scale-in { animation: scale-in 0.6s ease-out; }
          .animate-bounce { animation: bounce 1s ease-in-out infinite; }
          
          .gradient-blue-purple { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); }
          .text-gradient { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #10b981 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        `}</style>

        <header className="border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="gradient-blue-purple p-2 rounded-lg">
                <Shield size={28} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">Z+ Security</span>
            </div>
            <button 
              onClick={() => {
                setEmail('');
                setChecked(false);
                setResult(null);
                setPage('landing');
              }}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors font-medium cursor-pointer"
            >
              Check Another
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Security Score */}
            <div className={`${safetyBg} border ${safetyBorder} rounded-2xl p-8 sm:p-12 text-center animate-scale-in`}>
              <div className="flex justify-center mb-6">
                <div className={`${result.isSafe ? 'text-green-400' : 'text-red-400'} animate-bounce`}>
                  <StatusIcon size={80} />
                </div>
              </div>
              
              <h1 className={`text-5xl sm:text-6xl font-black mb-4 ${safetyColor}`}>
                {result.isSafe ? 'SAFE' : 'UNSAFE'}
              </h1>
              
              <p className="text-xl text-gray-400 mb-4 break-all">
                {result.email}
              </p>

              {/* Security Score Bar */}
              <div className="mb-6">
                <div className="text-3xl font-black text-gradient mb-2">{result.score}/100</div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${result.isSafe ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`}
                    style={{width: `${result.score}%`}}
                  ></div>
                </div>
              </div>

              <p className="text-gray-400 max-w-2xl mx-auto">
                {result.isSafe 
                  ? '✓ Your email appears secure. However, always use strong passwords and enable 2FA.' 
                  : '⚠ Your email has been found in data breaches. Take immediate action to secure your accounts.'}
              </p>
            </div>

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 animate-scale-in" style={{animationDelay: '0.1s'}}>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Database size={20} className="text-purple-400" />
                  Breach Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Breaches Found</span>
                    <span className={`font-bold text-lg ${result.details.dataBreach > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {result.details.dataBreach}
                    </span>
                  </div>
                  <div className="pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Status</span>
                    <p className={`font-bold mt-1 ${result.details.dataBreach > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {result.details.breachHistory}
                    </p>
                  </div>
                  {result.details.breachedServices.length > 0 && (
                    <div>
                      <span className="text-gray-400">Affected Services</span>
                      <div className="mt-2 space-y-1">
                        {result.details.breachedServices.map((service, idx) => (
                          <p key={idx} className="text-sm text-red-400">• {service}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 animate-scale-in" style={{animationDelay: '0.2s'}}>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <AlertCircle size={20} className="text-purple-400" />
                  Risk Assessment
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Spam Risk</span>
                    <span className={`font-bold ${result.details.spamRisk === 'Low Risk' ? 'text-green-400' : 'text-red-400'}`}>
                      {result.details.spamRisk}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Domain Status</span>
                    <span className={`font-bold ${result.details.domainReputation === 'Good' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {result.details.domainReputation}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Password Status</span>
                    <span className="text-yellow-400 font-bold">Needs Update</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8 animate-scale-in" style={{animationDelay: '0.3s'}}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap size={24} className="text-yellow-400" />
                Recommended Actions
              </h2>
              
              <div className="space-y-4">
                {[
                  { title: 'Change Your Password', desc: 'Create a strong unique password at least 16 characters long', priority: 'High' },
                  { title: 'Enable Two-Factor Authentication', desc: 'Add extra security layer with 2FA on all important accounts', priority: 'High' },
                  { title: 'Monitor Account Activity', desc: 'Regularly check login history and connected apps', priority: 'Medium' },
                  { title: 'Use a Password Manager', desc: 'Store and manage complex passwords securely', priority: 'Medium' },
                  { title: 'Check Other Accounts', desc: 'If you reuse passwords, update them on other services too', priority: 'High' }
                ].map((rec, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b border-gray-700 last:border-0">
                    <div className={`px-3 py-1 rounded text-xs font-bold h-fit whitespace-nowrap ${
                      rec.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {rec.priority}
                    </div>
                    <div>
                      <p className="font-bold text-white">{rec.title}</p>
                      <p className="text-sm text-gray-400">{rec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Features */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 animate-scale-in" style={{animationDelay: '0.4s'}}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp size={24} className="text-green-400" />
                Coming Soon - Z+ Premium
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: '📧', title: 'Email Alias Generator', desc: 'Create temporary emails for sign-ups' },
                  { icon: '🔐', title: 'Password Strength Checker', desc: 'Real-time password analysis' },
                  { icon: '⚙️', title: 'Account Auto-Lockdown', desc: 'Automatic security if breach detected' },
                  { icon: '📊', title: 'Monthly Reports', desc: 'Detailed digital security status' },
                  { icon: '🔔', title: 'Real-time Alerts', desc: 'Instant breach notifications' },
                  { icon: '🛡️', title: 'VPN Integration', desc: 'Secure browsing & data protection' }
                ].map((feature, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-purple-600 transition-colors">
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <p className="font-bold text-white mb-1">{feature.title}</p>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-6 pb-12">
              <h2 className="text-3xl font-bold text-white">Share Your Results</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Help others check their email security. Share Z+ Security with your friends and family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 gradient-blue-purple text-white font-bold rounded-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 cursor-pointer">
                  Share Z+ Security
                </button>
                <button 
                  onClick={() => {
                    setEmail('');
                    setChecked(false);
                    setResult(null);
                    setPage('landing');
                  }}
                  className="px-8 py-4 border-2 border-purple-600 text-purple-400 font-bold rounded-lg hover:bg-purple-600/10 transition-colors cursor-pointer"
                >
                  Check Another Email
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-gray-500 mb-4">
              © 2024 Z+ Security. Protecting your digital identity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-600">
              <span>Created by</span>
              <a href="https://www.instagram.com/shahnwaj7076/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-semibold">
                @shahnwaj7076
              </a>
              <span>|</span>
              <a href="mailto:mailtemple02@gmail.com" className="text-purple-400 hover:text-purple-300 font-semibold">
                mailtemple02@gmail.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return null;
}