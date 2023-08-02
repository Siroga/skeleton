import User from "../models/user-model";
import bcrypt from 'bcryptjs';
import uuid from 'uuid';
import tokenService, {TokensPayload} from "./token-service";
import ApiError from "../exceptions/apiError";

class UserService {
    async registration(email: string, password: string) {
        const oldUser = await User.findOne({email});

        if(oldUser){
            throw ApiError.BadRequest('User exist!');
        }
        const hash = await bcrypt.hash(password, 5);
        //const link = uuid.v4();
        const user = await User.create({email, password: hash, activationLink: hash});

        //TODO: send email

        const userData = {
            id: user._id,
            email: user.email,
            isActivated: user.isActivated
        };

        const tokens = await tokenService.generateTokens(userData);

        tokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userData
        };
    }

    async activate(activationLink: string){
        const user = await User.findOne({activationLink});

        if(!user){
            throw ApiError.BadRequest('Incorrect link!');
        }

        user.isActivated = true;
        await user.save();
    }

    async login(email: string, password: string) {
        const user = await User.findOne({email});

        if(!user){
            throw ApiError.BadRequest('User Not Found');
        }

        const isPassCorrect = await bcrypt.compare(password, user.password);

        if(!isPassCorrect) {
            throw ApiError.BadRequest('Incorrect password');
        }

        const userData = {
            id: user._id,
            email: user.email,
            isActivated: user.isActivated
        };

        const tokens = await tokenService.generateTokens(userData);

        tokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userData
        };
    }

    async logout(rerefreshToken: string){
        tokenService.removeToken(rerefreshToken);
    }

    async refresh(refreshToken: string) {
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }

        const userToken = tokenService.validateRefreshToken(refreshToken);
        const token = tokenService.findToken(refreshToken);

        if(!userToken || !token){
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findById((userToken as any).id);

        if(!user) {
            throw ApiError.BadRequest('User Not Found');
        }

        const userData = {
            id: user._id,
            email: user.email,
            isActivated: user.isActivated
        };

        const tokens = await tokenService.generateTokens(userData);

        tokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userData
        };
    }
}

export default new UserService();