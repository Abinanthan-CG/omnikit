import React from 'react';

export type ToolCategory = 'all' | 'video' | 'audio' | 'design' | 'writing' | 'dev';

export interface EngineResult<T> {
  success: boolean;
  value?: T;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface ToolDefinition {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  tags: string[];
  keywords: string[];
  component: React.ComponentType;
  icon?: string;
}
