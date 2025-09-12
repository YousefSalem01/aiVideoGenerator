import React, { createContext, useContext, useState } from 'react';

interface VideoPost {
  id: string;
  title: string;
  prompt: string;
  status: 'generating' | 'generated' | 'published' | 'scheduled';
  createdAt: Date;
  scheduledAt?: Date;
  thumbnail?: string;
  platforms: string[];
}

interface AppContextType {
  posts: VideoPost[];
  connectedPlatforms: string[];
  addPost: (post: Omit<VideoPost, 'id' | 'createdAt'>) => void;
  updatePost: (id: string, updates: Partial<VideoPost>) => void;
  connectPlatform: (platform: string) => void;
  disconnectPlatform: (platform: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<VideoPost[]>([]);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

  const addPost = (postData: Omit<VideoPost, 'id' | 'createdAt'>) => {
    const newPost: VideoPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setPosts(prev => [newPost, ...prev]);
    
    // Simulate video generation process
    setTimeout(() => {
      updatePost(newPost.id, { status: 'generated' });
    }, 5000);
  };

  const updatePost = (id: string, updates: Partial<VideoPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ));
  };

  const connectPlatform = (platform: string) => {
    setConnectedPlatforms(prev => [...prev, platform]);
  };

  const disconnectPlatform = (platform: string) => {
    setConnectedPlatforms(prev => prev.filter(p => p !== platform));
  };

  return (
    <AppContext.Provider value={{
      posts,
      connectedPlatforms,
      addPost,
      updatePost,
      connectPlatform,
      disconnectPlatform
    }}>
      {children}
    </AppContext.Provider>
  );
}