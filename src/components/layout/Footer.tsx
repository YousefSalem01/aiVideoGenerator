import { Video, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Video className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-slate-800">AI VideoGen</span>
            </div>
            <p className="text-slate-600 max-w-md">
              Create stunning AI-generated videos for social media platforms with just a few clicks. 
              Perfect for content creators, marketers, and businesses.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-slate-500 hover:text-slate-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-700 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-slate-800 font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Features</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">API</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-slate-800 font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 hover:text-slate-800 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-300 mt-8 pt-8 text-center">
          <p className="text-slate-500">© 2025 AI VideoGen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}