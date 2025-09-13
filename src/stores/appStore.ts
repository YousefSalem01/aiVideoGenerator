import { create } from 'zustand';

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

interface AppState {
  posts: VideoPost[];
  connectedPlatforms: string[];
  addPost: (post: Omit<VideoPost, 'id' | 'createdAt'>) => void;
  updatePost: (id: string, updates: Partial<VideoPost>) => void;
  connectPlatform: (platform: string) => void;
  disconnectPlatform: (platform: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  posts: [],
  connectedPlatforms: [],

  addPost: (postData: Omit<VideoPost, 'id' | 'createdAt'>) => {
    const newPost: VideoPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    set((state) => ({
      posts: [newPost, ...state.posts]
    }));
    
    // Simulate video generation process
    setTimeout(() => {
      get().updatePost(newPost.id, { status: 'generated' });
    }, 5000);
  },

  updatePost: (id: string, updates: Partial<VideoPost>) => {
    set((state) => ({
      posts: state.posts.map(post => 
        post.id === id ? { ...post, ...updates } : post
      )
    }));
  },

  connectPlatform: (platform: string) => {
    set((state) => ({
      connectedPlatforms: [...state.connectedPlatforms, platform]
    }));
  },

  disconnectPlatform: (platform: string) => {
    set((state) => ({
      connectedPlatforms: state.connectedPlatforms.filter(p => p !== platform)
    }));
  }
}));
