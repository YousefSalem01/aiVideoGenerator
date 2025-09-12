import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Zap, Settings as SettingsIcon, Play } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export function Dashboard() {
  const { connectedPlatforms, addPost } = useApp();
  const [prompt, setPrompt] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [publishType, setPublishType] = useState<'auto' | 'approval'>('approval');
  const [isGenerating, setIsGenerating] = useState(false);

  const platforms = [
    { id: 'youtube', name: 'YouTube Shorts', color: 'bg-red-500' },
    { id: 'instagram', name: 'Instagram Reels', color: 'bg-pink-500' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-purple-500' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || selectedPlatforms.length === 0) return;

    setIsGenerating(true);
    
    addPost({
      title: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
      prompt,
      status: 'generating',
      platforms: selectedPlatforms
    });

    setPrompt('');
    setSelectedPlatforms([]);
    
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  if (connectedPlatforms.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>
        
        <Card className="text-center py-16">
          <CardContent>
            <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <SettingsIcon className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Connect your social media accounts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              To start generating videos, you need to connect at least one social media platform.
            </p>
            <Link to="/dashboard/settings">
              <Button size="lg">Connect Accounts</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Create your next viral video with AI</p>
      </div>

      {/* Video Generation Form */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Generate New Video</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Video Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the video you want to create... (e.g., 'Create a motivational video about morning routines with upbeat music')"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
              rows={4}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reference File (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">
                Drop files here or <span className="text-blue-500">browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Support for articles, scripts, images (PDF, DOC, TXT, PNG, JPG)
              </p>
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Platforms
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {platforms.map((platform) => {
                const isConnected = connectedPlatforms.includes(platform.id);
                const isSelected = selectedPlatforms.includes(platform.id);
                
                return (
                  <button
                    key={platform.id}
                    onClick={() => {
                      if (!isConnected) return;
                      setSelectedPlatforms(prev =>
                        isSelected
                          ? prev.filter(p => p !== platform.id)
                          : [...prev, platform.id]
                      );
                    }}
                    disabled={!isConnected}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      !isConnected
                        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-50 cursor-not-allowed'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {platform.name}
                      </span>
                      {!isConnected && (
                        <span className="text-xs text-gray-500">(Not connected)</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Publishing Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Publishing Type
            </label>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setPublishType('approval')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  publishType === 'approval'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Publish with Approval
              </button>
              <button
                onClick={() => setPublishType('auto')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  publishType === 'auto'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Auto-Publish
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || selectedPlatforms.length === 0 || isGenerating}
            className="w-full"
            size="lg"
            icon={isGenerating ? undefined : Zap}
            isLoading={isGenerating}
          >
            {isGenerating ? 'Generating Video...' : 'Generate Video'}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Videos Generated</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connected Platforms</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{connectedPlatforms.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}