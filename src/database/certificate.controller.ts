import { INDEX_DB_VERSION } from '@/utils/constants';
import { ICertificate, ISupplierData } from '@/utils/types/certificate';

let db: IDBDatabase | undefined;

export enum Stores {
  certificatesData = 'certificates',
}

export const connectDB = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('certificates-manager', INDEX_DB_VERSION);

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
  data: ISupplierData,
): Promise<ISupplierData | string | null> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not connected'));
      return;
    }

    const tx = db.transaction(Stores.certificatesData, 'readwrite');
    const store = tx.objectStore(Stores.certificatesData);
    const addRequest = store.add(data);

    addRequest.onsuccess = (): void => {
      resolve(data);
    };

    addRequest.onerror = (): void => {
      reject(
        new Error(`Failed to add certificate: ${addRequest.error?.message}`),
      );
    };
  });
};

export const getAllCertificates = (): Promise<ICertificate[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not connected'));
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
        new Error(
          `Failed to retrieve certificates: ${getAllRequest.error?.message}`,
        ),
      );
    };
  });
};

export const closeDB = (): void => {
  if (db) {
    db.close();
  }
};
