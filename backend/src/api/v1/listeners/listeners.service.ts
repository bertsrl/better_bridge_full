import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';

export interface Listener {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  config: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ListenersService {
  private listeners: Listener[] = [
    {
      id: '1',
      name: 'Webhook Listener',
      type: 'webhook',
      status: 'active',
      config: { url: 'https://example.com/webhook', method: 'POST' },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Email Listener',
      type: 'email',
      status: 'inactive',
      config: { email: 'listener@example.com', frequency: 'daily' },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async getAllListeners(query: any): Promise<Listener[]> {
    // Add filtering logic based on query parameters
    let filteredListeners = [...this.listeners];
    
    if (query.status) {
      filteredListeners = filteredListeners.filter(
        listener => listener.status === query.status
      );
    }
    
    if (query.type) {
      filteredListeners = filteredListeners.filter(
        listener => listener.type === query.type
      );
    }

    return filteredListeners;
  }

  async getListenerById(id: string): Promise<Listener> {
    const listener = this.listeners.find(l => l.id === id);
    if (!listener) {
      throw new NotFoundException(`Listener with ID ${id} not found`);
    }
    return listener;
  }

  async createListener(createListenerDto: CreateListenerDto): Promise<Listener> {
    const newListener: Listener = {
      id: Date.now().toString(), // Simple ID generation
      ...createListenerDto,
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.listeners.push(newListener);
    return newListener;
  }

  async updateListener(id: string, updateListenerDto: UpdateListenerDto): Promise<Listener> {
    const listenerIndex = this.listeners.findIndex(l => l.id === id);
    if (listenerIndex === -1) {
      throw new NotFoundException(`Listener with ID ${id} not found`);
    }

    this.listeners[listenerIndex] = {
      ...this.listeners[listenerIndex],
      ...updateListenerDto,
      updatedAt: new Date(),
    };

    return this.listeners[listenerIndex];
  }

  async deleteListener(id: string): Promise<{ message: string }> {
    const listenerIndex = this.listeners.findIndex(l => l.id === id);
    if (listenerIndex === -1) {
      throw new NotFoundException(`Listener with ID ${id} not found`);
    }

    this.listeners.splice(listenerIndex, 1);
    return { message: `Listener with ID ${id} has been deleted` };
  }

  // Custom service methods
  async activateListener(id: string): Promise<Listener> {
    const listener = await this.getListenerById(id);
    listener.status = 'active';
    listener.updatedAt = new Date();
    return listener;
  }

  async deactivateListener(id: string): Promise<Listener> {
    const listener = await this.getListenerById(id);
    listener.status = 'inactive';
    listener.updatedAt = new Date();
    return listener;
  }

  async getListenerStatus(id: string): Promise<{ id: string; status: string; lastUpdated: Date }> {
    const listener = await this.getListenerById(id);
    return {
      id: listener.id,
      status: listener.status,
      lastUpdated: listener.updatedAt,
    };
  }
}
