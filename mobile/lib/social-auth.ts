import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { AuthService } from './auth';

const API_BASE_URL = 'https://please-eternal-merry-messages.trycloudflare.com';

export class SocialAuthService {
  static async signInWithGoogle() {
    try {
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      const codeChallenge = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        Math.random().toString(),
        { encoding: Crypto.CryptoEncoding.BASE64URL }
      );

      const request = new AuthSession.AuthRequest({
        clientId: 'your-google-client-id', // Replace with actual client ID
        scopes: ['openid', 'profile', 'email'],
        redirectUri,
        responseType: AuthSession.ResponseType.Code,
        codeChallenge,
        codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
      });

      const result = await request.promptAsync({
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      });

      if (result.type === 'success') {
        // Exchange code for token on your backend
        const response = await fetch(`${API_BASE_URL}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            code: result.params.code,
            redirectUri 
          }),
        });

        if (response.ok) {
          const data = await response.json();
          await AuthService.saveAuthData(data);
          return data;
        }
      }
      throw new Error('Google sign-in failed');
    } catch (error) {
      console.error('Google auth error:', error);
      throw error;
    }
  }

  static async signInWithGitHub() {
    try {
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

      const request = new AuthSession.AuthRequest({
        clientId: 'your-github-client-id', // Replace with actual client ID
        scopes: ['user:email'],
        redirectUri,
        responseType: AuthSession.ResponseType.Code,
      });

      const result = await request.promptAsync({
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      });

      if (result.type === 'success') {
        // Exchange code for token on your backend
        const response = await fetch(`${API_BASE_URL}/auth/github`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            code: result.params.code,
            redirectUri 
          }),
        });

        if (response.ok) {
          const data = await response.json();
          await AuthService.saveAuthData(data);
          return data;
        }
      }
      throw new Error('GitHub sign-in failed');
    } catch (error) {
      console.error('GitHub auth error:', error);
      throw error;
    }
  }
}
