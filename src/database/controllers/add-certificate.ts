import { ICertificate } from '@/utils/types/certificate';

let db: IDBDatabase;
const version = 1;

export enum Stores {
  certificatesData = 'certificates',
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('certificatesDB', version);

    request.onupgradeneeded = (event): void => {
      const database = (event.target as IDBOpenDBRequest).result;

      if (!database.objectStoreNames.contains(Stores.certificatesData)) {
        database.createObjectStore(Stores.certificatesData, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (): void => {
      db = request.result;
      resolve(true);
    };

    request.onerror = (): void => {
      reject(new Error(`Database error: ${request.error?.message}`));
    };
  });
};

export const addCertificate = (
  data: ICertificate,
): Promise<ICertificate | string | null> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const tx = db.transaction(Stores.certificatesData, 'readwrite');
    const store = tx.objectStore(Stores.certificatesData);
    const addRequest = store.add(data);

    addRequest.onsuccess = (): void => {
      resolve(data);
      alert('Certificate added successfully');
    };

    addRequest.onerror = (): void => {
      reject(new Error(`Add request error: ${addRequest.error?.message}`));
    };
  });
};

export const getAllCertificates = (): Promise<ICertificate[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }

    const tx = db.transaction(Stores.certificatesData, 'readonly');
    const store = tx.objectStore(Stores.certificatesData);

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = (): void => {
      resolve(getAllRequest.result);
    };

    getAllRequest.onerror = (): void => {
      reject(
        new Error(`Get all request error: ${getAllRequest.error?.message}`),
      );
    };
  });
};
