  // Import Firebase modules.
  import { initializeApp, getApp } from 'firebase/app';
  import { getAuth, SAMLAuthProvider, signInWithRedirect, User, UserCredential, Auth } from 'firebase/auth';
  // Import the gcip-iap module.
  import * as ciap from 'gcip-iap';
  import { firebaseConfig } from './config';

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

const authHandlerSAML: AuthenticationHandler = {
   selectTenant: function (_projectConfig: ProjectConfig, _tenantIds: string[]): Promise<SelectedTenantInfo> {
    return new Promise((resolve, reject) => {
      resolve({
        tenantId: null,
        providerIds: ["saml.entra"]
      });
    });
  },

  getAuth: function (_apiKey: string, tenantId: string | null): Auth {
    const app = initializeApp(firebaseConfig, tenantId || '[DEFAULT]');
    let auth = getAuth(app);
    // Set the tenant ID on the Auth instance.
    auth.tenantId = null;
    return auth;
  },

  startSignIn: function (auth: Auth, _selectedTenantInfo: SelectedTenantInfo) {
    return new Promise(() => {
      const provider = new SAMLAuthProvider('saml.entra');
      signInWithRedirect(auth, provider);
    });
  },

  completeSignOut: function(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    })
  }
}

const ciapInstance = new ciap.Authentication(authHandlerSAML);
ciapInstance.start();