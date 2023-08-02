import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import tokenModel from '../models/token-model';

interface TokensResult {
  accessToken: string;
  refreshToken: string;
}

export interface TokensPayload {
  email: string;
  id: Types.ObjectId;
  isActivated: boolean;
}

class TokenService {
  async generateTokens(payload: TokensPayload): Promise<TokensResult> {
    const accessToken = jwt.sign(payload, 'secKey', { expiresIn: '10m' });
    const refreshToken = jwt.sign(payload, 'secKey', { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: any, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }

    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    return await tokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string) {
    return await tokenModel.findOne({ refreshToken });
  }

  async validateAccessToken(token: string) {
    try {
      return jwt.verify(token, 'secKey');
    } catch (e) {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, 'secKey');
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
