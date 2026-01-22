import { db } from '../firebase';
import { Product, Event, WalletTransaction } from '../types';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const snapshot = await db.collection('products').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
    return db.collection('products').add(product);
};

export const getEvents = async (): Promise<Event[]> => {
  try {
    const snapshot = await db.collection('events').orderBy('date', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
  } catch (error) {
    console.error("Error getting events:", error);
    return [];
  }
};

export const addEvent = async (event: Omit<Event, 'id'>) => {
    return db.collection('events').add(event);
};

// ... Keep your existing Wallet functions below ...
export const getWalletTransactions = async (userId: string): Promise<WalletTransaction[]> => {
    const transactionsCol = db.collection(`users/${userId}/wallet`).orderBy('date', 'desc');
    const transactionSnapshot = await transactionsCol.get();
    return transactionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WalletTransaction));
};

export const addWalletTransaction = async (userId: string, description: string, points: number): Promise<void> => {
    await db.collection(`users/${userId}/wallet`).add({
        description, points, date: new Date().toISOString(),
    });
};

export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const doc = await db.collection('products').doc(id).get();
        if (doc.exists) return { id: doc.id, ...doc.data() } as Product;
        return null;
    } catch (e) { return null; }
}

// Fetch blog/community posts
export const getBlogPosts = async (): Promise<any[]> => {
  try {
    const snapshot = await db.collection('blogPosts').orderBy('date', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};