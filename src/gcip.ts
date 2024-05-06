// Import Firebase modules.
import { initializeApp } from 'firebase/app';
import { getAuth, SAMLAuthProvider, signInWithRedirect, User, UserCredential, Auth } from 'firebase/auth';
// Import the gcip-iap module.
import * as ciap from 'gcip-iap';
// Import the configuration
import { firebaseConfig, tenantId, providerId } from './config';

// Type definitions for gcip-iap
interface SelectedTenantInfo {
  email?: string;
  tenantId: string | null;
  providerIds?: string[];
}

interface ProjectConfig {
  projectId: string;
  apiKey: string;
}

interface AuthenticationHandler {
  languageCode?: string | null;
  getAuth(apiKey: string, tenantId: string | null): Auth;
  startSignIn(auth: Auth, match?: SelectedTenantInfo): Promise<UserCredential>;
  selectTenant?(projectConfig: ProjectConfig, tenantIds: string[]): Promise<SelectedTenantInfo>;
  completeSignOut(): Promise<void>;
  processUser?(user: User): Promise<User>;
  showProgressBar?(): void;
  hideProgressBar?(): void;
  handleError?(error: Error | ciap.CIAPError): void;
}

// Implementation of AuthenticationHandler
const authHandlerSAML: AuthenticationHandler = {
   selectTenant: function (_projectConfig: ProjectConfig, _tenantIds: string[]): Promise<SelectedTenantInfo> {
    return new Promise((resolve, _reject) => {
      resolve({
        tenantId: tenantId,
        providerIds: [providerId]
      });
    });
  },

  getAuth: function (_apiKey: string, tenantId: string | null): Auth {
    const app = initializeApp(firebaseConfig, tenantId || '[DEFAULT]');
    let auth = getAuth(app);
    auth.tenantId = tenantId;
    return auth;
  },

  startSignIn: function (auth: Auth, _selectedTenantInfo: SelectedTenantInfo) {
    return new Promise(() => {
      const provider = new SAMLAuthProvider(providerId);
      signInWithRedirect(auth, provider);
    });
  },

  completeSignOut: function(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    })
  }
}

// Pass the implementation to Authentication constructor and start
const ciapInstance = new ciap.Authentication(authHandlerSAML);
ciapInstance.start();