import { INDEX_DB_VERSION } from '@/utils/constants';
import { ICertificate, ICertificateFormData } from '@/utils/types/certificate';

let db: IDBDatabase;

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
  data: ICertificateFormData,
): Promise<ICertificateFormData | string | null> => {
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
        new Error(`Get all request error: ${getAllRequest.error?.message}`),
      );
    };
  });
};
export const getCertificateById = (
  id: number,
): Promise<ICertificate | null> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not connected'));
      return;
    }

    const tx = db.transaction(Stores.certificatesData, 'readonly');
    const store = tx.objectStore(Stores.certificatesData);

    const getRequest = store.get(id);

    getRequest.onsuccess = (): void => {
      resolve(getRequest.result as ICertificate | null);
    };

    getRequest.onerror = (): void => {
      reject(new Error(`Get request error: ${getRequest.error?.message}`));
    };
  });
};

export const updateCertificate = (
  id: number | undefined,
  data: ICertificateFormData,
): Promise<ICertificateFormData | string | null> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not connected'));
      return;
    }

    const tx = db.transaction(Stores.certificatesData, 'readwrite');
    const store = tx.objectStore(Stores.certificatesData);
    const updateRequest = store.put({ ...data, id });

    updateRequest.onsuccess = (): void => {
      resolve(data);
      alert('Certificate updated successfully');
    };

    updateRequest.onerror = (): void => {
      reject(
        new Error(`Update request error: ${updateRequest.error?.message}`),
      );
    };
  });
};
export const deleteCertificate = (id: number | undefined): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not connected'));
      return;
    }

    if (id === undefined) {
      reject(new Error('ID is required for delete'));
      return;
    }

    const tx = db.transaction(Stores.certificatesData, 'readwrite');
    const store = tx.objectStore(Stores.certificatesData);
    const deleteRequest = store.delete(id);

    tx.onerror = () => {
      reject(new Error('Transaction failed'));
    };

    deleteRequest.onsuccess = (): void => {
      resolve();
      console.log('Certificate deleted successfully');
    };

    deleteRequest.onerror = (): void => {
      reject(
        new Error(`Delete request error: ${deleteRequest.error?.message}`),
      );
    };
  });
};
